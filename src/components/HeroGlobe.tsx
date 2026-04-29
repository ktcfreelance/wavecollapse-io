import { useEffect, useRef, useState, useMemo } from 'react';
import Globe from 'react-globe.gl';

// ── Settlement Hub Network ──
// OFAC-excluded: No hubs in Cuba, Iran, North Korea, Syria, Russia,
// Crimea/Donetsk/Luhansk, or comprehensively sanctioned jurisdictions.
const hubs = [
  // North America
  { lat: 40.7128, lng: -74.0060, name: 'New York' },
  { lat: 25.7617, lng: -80.1918, name: 'Miami' },
  { lat: 37.7749, lng: -122.4194, name: 'San Francisco' },
  { lat: 41.8781, lng: -87.6298, name: 'Chicago' },
  { lat: 43.6532, lng: -79.3832, name: 'Toronto' },
  { lat: 19.4326, lng: -99.1332, name: 'Mexico City' },
  // Latin America & Caribbean
  { lat: -23.5505, lng: -46.6333, name: 'São Paulo' },
  { lat: -34.6037, lng: -58.3816, name: 'Buenos Aires' },
  { lat: 4.7110, lng: -74.0721, name: 'Bogotá' },
  { lat: -33.4489, lng: -70.6693, name: 'Santiago' },
  { lat: -12.0464, lng: -77.0428, name: 'Lima' },
  { lat: 8.9824, lng: -79.5199, name: 'Panama City' },
  { lat: -34.9011, lng: -56.1645, name: 'Montevideo' },
  { lat: 19.3133, lng: -81.2546, name: 'Grand Cayman' },
  { lat: 32.2949, lng: -64.7820, name: 'Bermuda' },
  // Europe
  { lat: 51.5074, lng: -0.1278, name: 'London' },
  { lat: 50.1109, lng: 8.6821, name: 'Frankfurt' },
  { lat: 48.8566, lng: 2.3522, name: 'Paris' },
  { lat: 47.3769, lng: 8.5417, name: 'Zurich' },
  { lat: 46.2044, lng: 6.1432, name: 'Geneva' },
  { lat: 52.3676, lng: 4.9041, name: 'Amsterdam' },
  { lat: 53.3498, lng: -6.2603, name: 'Dublin' },
  { lat: 49.6116, lng: 6.1319, name: 'Luxembourg' },
  // Asia-Pacific
  { lat: 35.6762, lng: 139.6503, name: 'Tokyo' },
  { lat: 1.3521, lng: 103.8198, name: 'Singapore' },
  { lat: 22.3193, lng: 114.1694, name: 'Hong Kong' },
  { lat: 37.5665, lng: 126.9780, name: 'Seoul' },
  { lat: 31.2304, lng: 121.4737, name: 'Shanghai' },
  { lat: 19.0760, lng: 72.8777, name: 'Mumbai' },
  { lat: 25.0330, lng: 121.5654, name: 'Taipei' },
  { lat: -6.2088, lng: 106.8456, name: 'Jakarta' },
  { lat: 13.7563, lng: 100.5018, name: 'Bangkok' },
  { lat: 3.1390, lng: 101.6869, name: 'Kuala Lumpur' },
  // Middle East
  { lat: 25.2048, lng: 55.2708, name: 'Dubai' },
  { lat: 24.4539, lng: 54.3773, name: 'Abu Dhabi' },
  { lat: 24.7136, lng: 46.6753, name: 'Riyadh' },
  { lat: 26.2285, lng: 50.5860, name: 'Bahrain' },
  // Oceania
  { lat: -33.8688, lng: 151.2093, name: 'Sydney' },
  // Africa
  { lat: -33.9249, lng: 18.4241, name: 'Cape Town' },
  { lat: -26.2041, lng: 28.0473, name: 'Johannesburg' },
  { lat: 6.5244, lng: 3.3792, name: 'Lagos' },
  { lat: -1.2921, lng: 36.8219, name: 'Nairobi' },
  { lat: 33.5731, lng: -7.5898, name: 'Casablanca' },
];

export default function HeroGlobe() {
  const globeEl = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });
  
  const arcsData = useMemo(() => {
    const pickColor = (): [string, string] => [
      ['#17CFAE', '#60A5FA'][Math.floor(Math.random() * 2)],
      ['#17CFAE', '#60A5FA'][Math.floor(Math.random() * 2)],
    ];
    const randomOther = (idx: number) => {
      let other = idx;
      while (other === idx) other = Math.floor(Math.random() * hubs.length);
      return other;
    };
    const makeArc = (from: typeof hubs[number], to: typeof hubs[number]) => ({
      startLat: from.lat, startLng: from.lng,
      endLat: to.lat, endLng: to.lng,
      color: pickColor(),
    });

    // Phase 1: guarantee every hub has at least one outgoing arc
    const arcs = hubs.map((hub, i) => makeArc(hub, hubs[randomOther(i)]));

    // Phase 2: guarantee every hub has at least one incoming arc
    const incomingSet = new Set(arcs.map(a => `${a.endLat},${a.endLng}`));
    hubs.forEach((hub, i) => {
      const key = `${hub.lat},${hub.lng}`;
      if (!incomingSet.has(key)) {
        const sender = hubs[randomOther(i)];
        arcs.push(makeArc(sender, hub));
        incomingSet.add(key);
      }
    });

    // Phase 3: fill remaining random arcs to reach target density
    const target = Math.max(90, arcs.length);
    while (arcs.length < target) {
      const from = hubs[Math.floor(Math.random() * hubs.length)];
      const to = hubs[randomOther(hubs.indexOf(from))];
      arcs.push(makeArc(from, to));
    }

    return arcs;
  }, []);

  const ringsData = useMemo(() => {
    return hubs.map(hub => ({
      lat: hub.lat,
      lng: hub.lng,
      maxR: Math.random() * 5 + 3,
      propagationSpeed: (Math.random() - 0.5) * 1 + 1,
      repeatPeriod: Math.random() * 500 + 800
    }));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById('globe-container');
      if (container) {
        const width = container.clientWidth;
        const height = container.clientHeight || width;
        // Expand canvas size by 40% to provide padding for high arcs
        setDimensions({ width: width * 1.4, height: height * 1.4 });
      }
    };

    window.addEventListener('resize', handleResize);
    // Initial size
    setTimeout(handleResize, 100);

    // Auto-rotate and start position
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
      globeEl.current.controls().enableZoom = false;
      // Compensate for larger canvas by increasing altitude proportionally (2.5 * 1.4 = 3.5)
      globeEl.current.pointOfView({ lat: 20, lng: -40, altitude: 3.5 });
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div id="globe-container" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <div style={{ position: 'absolute', width: dimensions.width, height: dimensions.height, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Globe
          ref={globeEl}
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          arcsData={arcsData}
          arcColor="color"
          arcDashLength={0.4}
          arcDashGap={0.2}
          arcDashAnimateTime={2000}
          arcsTransitionDuration={0}
          ringsData={ringsData}
          ringColor={() => (t: number) => `rgba(23, 207, 174, ${1 - t})`}
          ringMaxRadius="maxR"
          ringPropagationSpeed="propagationSpeed"
          ringRepeatPeriod="repeatPeriod"
          showAtmosphere={true}
          atmosphereColor="#17CFAE"
          atmosphereAltitude={0.15}
        />
      </div>
    </div>
  );
}
