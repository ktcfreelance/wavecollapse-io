import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Validator from './pages/Validator';
import Archive from './pages/Archive';
import Facilitator from './pages/Facilitator';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="validator" element={<Validator />} />
        <Route path="archive" element={<Archive />} />
        <Route path="facilitator" element={<Facilitator />} />
      </Route>
    </Routes>
  );
}

export default App;
