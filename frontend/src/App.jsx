import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Recommendation from "./pages/recommendation.jsx";
import Plat_info from './pages/plat_info/plat_info.jsx';
import Plat_All from './pages/plats/plats.jsx';
import NbrPerson from './components/nbrPerson/nbrPerson.jsx';

function App() {

  return (

    <div className="custom-cursor">
    <Router>
      <Routes>
      <Route path="/" element={<Recommendation />} />
      <Route path="/plats" element={<Plat_All />} />
      <Route path="/platinfo" element={<Plat_info />} />
      <Route path="/nbrperson" element={<NbrPerson value={1}/>} />
      
      </Routes>
    </Router>
    </div>

  );
}

export default App
