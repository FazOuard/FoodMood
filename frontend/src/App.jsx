import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Recommendation from "./pages/recommendation/recommendation.jsx";
import Plat_info from './pages/plat_info/plat_info.jsx';
import Plat_All from './pages/plats/plats.jsx';
import Planifier from './pages/planifier/planifier.jsx';
import PlanWeek from './pages/planweek/planweek.jsx';
import PlanMonth from './pages/PlanMonth/PlanMonth.jsx';
import ProfilAdmin from './pages/admin/admin.jsx';
import PlotComponent from './pages/admin/dashboard.jsx';
import Recommend from './pages/recommendation/recommend.jsx';
import Authentication from "./components/Authentification/Authentication.jsx";
import RegistrationForm from "./components/Create/Creat.jsx";

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
      <Route path="/Admin" element={<ProfilAdmin />} >
      <Route path="Dashboard" element={<PlotComponent />} />
      {/* <Route path="/auth" element={<Authentication />} />  {/* Route pour la page de connexion */}
      {/* <Route path="/Creat" element={<RegistrationForm />} />  */}
      </Route>
      <Route path="recommend" element={<Recommend />} />
      </Routes>
    </Router>
    </div>

  );
}

export default App
