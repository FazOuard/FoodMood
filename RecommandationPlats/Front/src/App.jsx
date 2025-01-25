import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import du routage
import Authentication from "./components/Authentication";
import RegistrationForm from "./components/Creat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authentication />} />  {/* Route pour la page de connexion */}
        <Route path="/Creat" element={<RegistrationForm />} />
        {/*<Route path="/dashboard" element={<div>Bienvenue sur le tableau de bord</div>} />  {/* Exemple de page après connexion */}
      </Routes>
    </Router>
  );
}

export default App;









