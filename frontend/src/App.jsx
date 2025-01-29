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
import AjouterPlat from './pages/ajouterPlat/ajouterPlat.jsx';

import Recommend from './pages/recommendation/recommend.jsx';
import ManageUsers from './pages/admin/ManageUsers.jsx';

import Authentication from "./components/Authentification/Authentication.jsx";
import RegistrationForm from "./components/Create/Creat.jsx";
import PlatIngredients from "./pages/test.jsx"
import Rapport from './pages/rapport/rapport.jsx';
import ManagePlaces from './pages/admin/ManagePlaces.jsx';
import Statistique from './components/statistique/statistique.jsx';

import Profile from './pages/profile/profile.jsx';


function App() {

  return (

    <div className="custom-cursor">
    <Router>
      <Routes>
        <Route path="/recomm" element={<Recommendation />} />
        <Route path="/plats" element={<Plat_All />} />
        <Route path="/ajouterPlat" element={<AjouterPlat />} />
        <Route path="/platinfo" element={<Plat_info />} />
        <Route path="/rapport" element={<Rapport />}/>
        <Route path="/plating" element={<PlatIngredients />} />
        <Route path="/planifier" element={<Planifier />} />
        <Route path="/planSemaine" element={<PlanWeek />} />
        <Route path="/planMois" element={<PlanMonth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Authentication />} /> 
        <Route path="/Creat" element={<RegistrationForm />} />
        <Route path="/Admin" element={<ProfilAdmin />} >
          <Route path="Dashboard" element={<PlotComponent />} />
          <Route path="ManageUsers" element={<ManageUsers/>} />
          <Route path="ManagePlaces" element={<ManagePlaces />} />
        </Route>
        <Route path="recommend" element={<Recommend />} />
        <Route path="statistiques" element={<Statistique />} />
       </Routes>
    </Router>
    </div>

  );
}

export default App
