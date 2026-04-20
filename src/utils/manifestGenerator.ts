import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export type NodeType = 'validator' | 'archive' | 'facilitator';

export interface NodeConfig {
  type: NodeType;
  nodeId: number;
  listenPort: number;
  rpcPort: number;
  p2pBootnodes?: string;
  // Archive node fields
  storageProvider?: string;
  s3Bucket?: string;
  s3Region?: string;
  // Facilitator node fields
  treasuryWallet?: string;
  relaySpread?: number;
  maxGasSubsidy?: number;
  // Validator DTC / Fiat-peg fields
  oracleRpc?: string;
  fundingMode?: 'DEX' | 'OTC';
  otcContract?: string;
}

export const generateManifest = async (config: NodeConfig) => {
  const zip = new JSZip();

  // ── 1. Generate core .env ────────────────────────────────────────────────
  let envFile = `WC_NODE_ID=${config.nodeId}\nWC_PORT=${config.listenPort}\nWC_RPC_PORT=${config.rpcPort}\n`;

  if (config.p2pBootnodes) envFile += `WC_BOOTNODES=${config.p2pBootnodes}\n`;

  if (config.type === 'archive') {
    if (config.storageProvider === 'azure') {
      envFile += `WC_AZURE_CONTAINER=${config.s3Bucket}\nAZURE_LOCATION=${config.s3Region}\n`;
    } else {
      envFile += `WC_S3_BUCKET=${config.s3Bucket}\nAWS_DEFAULT_REGION=${config.s3Region}\n`;
    }
  }

  if (config.type === 'facilitator') {
    envFile += `WC_TREASURY=${config.treasuryWallet}\nWC_RELAY_SPREAD=${config.relaySpread}\nWC_MAX_SUBSIDY=${config.maxGasSubsidy}\n`;
  }

  if (config.type === 'validator') {
    // WC_ORACLE_RPC is a mandatory critical variable. If absent, the node
    // cannot calculate its required DTC stake and must refuse to start.
    if (!config.oracleRpc) {
      throw new Error(
        'WC_ORACLE_RPC is required for Validator nodes. ' +
        'Without a live oracle feed, the node cannot verify its fiat-pegged stake ' +
        'and will be blocked from joining a Dynamic Threshold Committee.'
      );
    }
    envFile += `\n# ── DTC / Fiat-Peg Configuration ─────────────────────────────────────────\n`;
    envFile += `# CRITICAL: If this endpoint is unreachable at startup, the node will\n`;
    envFile += `# refuse to announce eligibility for any Dynamic Threshold Committee (DTC).\n`;
    envFile += `# Operators may substitute a direct Chainlink or Pyth Network endpoint.\n`;
    envFile += `WC_ORACLE_RPC=${config.oracleRpc}\n`;
    envFile += `WC_ORACLE_REQUIRED=true\n`;
    envFile += `WC_FUNDING_MODE=${config.fundingMode ?? 'DEX'}\n`;
    if (config.fundingMode === 'OTC' && config.otcContract) {
      envFile += `WC_OTC_CONTRACT=${config.otcContract}\n`;
    }
  }

  zip.file('.env', envFile);

  // ── 2. Generate docker-compose.yml based on node type ───────────────────
  let composeTypeParams = `--node-type=validator`;

  if (config.type === 'archive') {
    if (config.storageProvider === 'azure') {
      composeTypeParams = `--node-type=archive --az-container=\${WC_AZURE_CONTAINER} --az-location=\${AZURE_LOCATION}`;
    } else {
      composeTypeParams = `--node-type=archive --s3-bucket=\${WC_S3_BUCKET} --s3-region=\${AWS_DEFAULT_REGION}`;
    }
  }

  if (config.type === 'facilitator') {
    composeTypeParams = `--node-type=relay --treasury=\${WC_TREASURY} --spread=\${WC_RELAY_SPREAD}`;
  }

  if (config.type === 'validator') {
    // --oracle-rpc is mandatory. Absence or unreachability triggers a startup
    // failure; the node will exit before advertising itself to the committee pool.
    composeTypeParams = `--node-type=validator --oracle-rpc=\${WC_ORACLE_RPC} --oracle-required=\${WC_ORACLE_REQUIRED}`;
    if (config.fundingMode === 'OTC' && config.otcContract) {
      composeTypeParams += ` --otc-contract=\${WC_OTC_CONTRACT}`;
    }
  }

  // ── 3. Build OTC healthcheck block ──────────────────────────────────────
  //
  // When funding mode is OTC, the validator service gets a two-stage guard:
  //   Stage 1 (depends_on / sync-status): Waits until the local node has
  //            synced the canonical chain far enough to actually read contract
  //            state (avoids a false-negative during initial sync).
  //   Stage 2 (healthcheck): Performs the on-chain SLA registry lookup.
  //            If the contract hash does not match, the container is marked
  //            "unhealthy" and Docker will not route it into the DTC pool.
  //
  const otcHealthcheck =
    config.type === 'validator' && config.fundingMode === 'OTC'
      ? `
    depends_on:
      wc-sync-status:
        condition: service_healthy

    healthcheck:
      # Verifies the OTC SLA contract hash against the on-chain registry.
      # The node will remain in an "unhealthy" state (and will NOT be admitted
      # to any Dynamic Threshold Committee) until this check passes.
      test:
        - CMD
        - sh
        - -c
        - |
          wc-cli contract verify \\
            --rpc=\${WC_RPC_PORT} \\
            --contract=\${WC_OTC_CONTRACT} \\
            --registry=otc-sla-registry \\
            && echo "SLA_OK"
      interval: 30s
      timeout: 10s
      start_period: 120s   # Allow time for chain sync before first check
      retries: 3`
      : '';

  const dockerCompose = `version: '3.8'

services:
${
  config.type === 'validator' && config.fundingMode === 'OTC'
    ? `  # Sync-status sidecar — ensures the main node has enough chain history
  # to reliably read on-chain OTC SLA contract state before the validator
  # is considered healthy and eligible for Dynamic Threshold Committees.
  wc-sync-status:
    image: ktcfreelance/wavecollapse:4.0
    container_name: wc-sync-status-${config.nodeId}
    env_file:
      - .env
    command:
      - --mode=sync-check
      - --min-block-height=1000
      - --rpc-port=\${WC_RPC_PORT}
    restart: on-failure
    healthcheck:
      test: ["CMD", "wc-cli", "sync", "--assert-synced"]
      interval: 15s
      timeout: 5s
      retries: 10

`
    : ''
}  wc-node:
    image: ktcfreelance/wavecollapse:4.0
    container_name: wc-node-${config.nodeId}
    restart: unless-stopped
    ports:
      - "\${WC_PORT}:\${WC_PORT}"
      - "\${WC_RPC_PORT}:\${WC_RPC_PORT}"
    env_file:
      - .env
    command:
      - --node-id=\${WC_NODE_ID}
      - --port=\${WC_PORT}
      - --rpc-port=\${WC_RPC_PORT}
      - ${composeTypeParams}
      ${config.p2pBootnodes ? '- --bootnodes=${WC_BOOTNODES}' : ''}${otcHealthcheck}
`;
  zip.file('docker-compose.yml', dockerCompose);

  // ── 4. Generate bash start script ───────────────────────────────────────
  const startScript = `#!/bin/bash
echo "[SYS] Bootstrapping WaveCollapse \${WC_NODE_ID}..."
docker compose up -d
echo "Node successfully started in detached mode."
docker compose logs -f
`;
  zip.file('start.sh', startScript);

  // ── 5. If archive, generate compliance policy ────────────────────────────
  if (config.type === 'archive') {
    if (config.storageProvider === 'azure') {
      const azurePolicy = {
        "Name": "WaveCollapseWormArchiveRole",
        "IsCustom": true,
        "Description": "Grants write and immutability lock permissions for WORM Azure Container",
        "Actions": [
          "Microsoft.Storage/storageAccounts/blobServices/containers/read",
          "Microsoft.Storage/storageAccounts/blobServices/containers/write",
          "Microsoft.Storage/storageAccounts/blobServices/containers/immutabilityPolicies/write"
        ],
        "NotActions": [],
        "DataActions": [
          "Microsoft.Storage/storageAccounts/blobServices/containers/blobs/write"
        ],
        "AssignableScopes": [
          `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{storageAccountName}/blobServices/default/containers/${config.s3Bucket}`
        ]
      };
      zip.file('azure-rbac-policy.json', JSON.stringify(azurePolicy, null, 2));
    } else {
      const iamPolicy = {
        Version: "2012-10-17",
        Statement: [
          {
            Sid: "WaveCollapseWormArchive",
            Effect: "Allow",
            Action: [
              "s3:PutObject",
              "s3:GetObject",
              "s3:PutObjectRetention"
            ],
            Resource: `arn:aws:s3:::${config.s3Bucket}/*`
          }
        ]
      };
      zip.file('aws-iam-policy.json', JSON.stringify(iamPolicy, null, 2));
    }
  }

  // ── 6. If OTC validator, output a README summary ─────────────────────────
  if (config.type === 'validator' && config.fundingMode === 'OTC') {
    const readme = `# WaveCollapse Validator — Institutional OTC Bundle
Node ID: ${config.nodeId}

## Startup Sequence
1. The \`wc-sync-status\` sidecar will start first and sync the chain.
2. Once the chain is sufficiently synced (≥ 1,000 blocks), the main
   \`wc-node\` service will start.
3. The node will verify your SLA contract hash (${config.otcContract})
   against the WaveCollapse on-chain OTC SLA Registry.
4. Only after a successful on-chain verification will the node advertise
   its eligibility to join Dynamic Threshold Committees (DTC).

## Critical Environment Variables
- WC_ORACLE_RPC: Must be reachable at all times. If the oracle goes dark,
  the node will suspend DTC participation until the feed is restored.
- WC_OTC_CONTRACT: Must match the hash registered in the on-chain OTC
  SLA Registry. Mismatch = node is blocked from consensus.

## Decentralized Oracle Alternative
Replace WC_ORACLE_RPC with a Chainlink or Pyth Network endpoint for
maximum censorship resistance:
  Chainlink (WAVE/USD):  https://feeds.chain.link/wave-usd
  Pyth Network:          https://hermes.pyth.network/v2/updates/price/latest

basis=$100,000 USD fiat peg is enforced by the protocol layer, not this config.
`;
    zip.file('README.md', readme);
  }

  // ── 7. Generate and download zip ─────────────────────────────────────────
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, `wavecollapse-${config.type}-bundle.zip`);
};
