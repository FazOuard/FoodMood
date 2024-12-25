import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Recommendation from "./pages/recommendation.jsx";
import Plats from './components/plats/plats.jsx';
import Plat from './components/plat/plat.jsx';
import Plat_info from './pages/plat_info/plat_info.jsx';

function App() {

  return (

    <div className="custom-cursor">
    <Router>
      <Routes>
      <Route path="/" element={<Recommendation />} />
      <Route path="/plats" element={<Plats />} />
      <Route path="/plat" element={<Plat />} />
      <Route path="/platinfo" element={<Plat_info />} />
      
      </Routes>
    </Router>
    </div>

  );
}

export default App
