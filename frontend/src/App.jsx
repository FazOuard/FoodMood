import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Recommendation from "./pages/recommendation.jsx";
import Plats from './components/plats/plats.jsx';
import Plat from './components/plat/plat.jsx';

function App() {

  return (

    <div className="custom-cursor">
    <Router>
      <Routes>
      <Route path="/" element={<Recommendation />} />
      <Route path="/plats" element={<Plats />} />
      <Route path="/plat" element={<Plat />} />
      </Routes>
    </Router>
    </div>

  );
}

export default App
