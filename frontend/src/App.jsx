import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Recommendation from "./pages/recommendation.jsx";
import Plat_info from './pages/plat_info/plat_info.jsx';
import Plat_All from './pages/plats/plats.jsx';
import Planifier from './pages/planifier/planifier.jsx';
import PlanWeek from './pages/planweek/planweek.jsx';
import PlanMonth from './pages/PlanMonth/PlanMonth.jsx';

function App() {

  return (

    <div className="custom-cursor">
    <Router>
      <Routes>
      <Route path="/" element={<Recommendation />} />
      <Route path="/plats" element={<Plat_All />} />
      <Route path="/platinfo" element={<Plat_info />} />
      <Route path="/planifier" element={<Planifier />} />
      <Route path="/planSemaine" element={<PlanWeek />} />
      <Route path="/planMois" element={<PlanMonth />} />
      </Routes>
    </Router>
    </div>

  );
}

export default App
