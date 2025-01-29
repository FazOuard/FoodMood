import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import des icônes
import "./Creat.css";

const RegistrationForm = () => {

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    age: "",
    city: "",
    favoriteDishes: [],
  });

  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false); // État pour afficher ou masquer le mot de passe
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // État pour afficher ou masquer le mot de passe de confirmation

  const navigate = useNavigate(); // Hook pour la redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextStep = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, step: 1 }), // Envoi des données en JSON
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        setStep(2); // Passer à l'étape suivante
      } else {
        setError(data.error || "Erreur lors de l'inscription.");
      }
    } catch (err) {
      setError("Une erreur est survenue pendant l'inscription.");
    }
  };
  

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, step: 2 }), // Envoi des données en JSON
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        alert(data.message);
        navigate("/plats");  // Rediriger vers la page de login après inscription
      } else {
        setError(data.error || "Erreur lors de l'inscription.");
      }
    } catch (err) {
      setError("Une erreur est survenue pendant l'inscription.");
    }
  };
  

  return (
    <div className="containerOfEverything">
    <div className="container">
      <div className="auth-container">
        <div className="auth-card">
          {step === 1 && (
            <>
              <h1>Créer un compte</h1>
              <form onSubmit={handleNextStep}>
                <input
                  type="email"
                  name="username"
                  placeholder="Email"
                  value={formData.username}
                  onChange={handleChange}
                />
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"} // Utiliser l'état pour afficher ou masquer le mot de passe
                    name="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)} // Inverser l'état de l'icône
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Afficher ou masquer l'icône */}
                  </span>
                </div>
                <div className="password-container">
                  <input
                    type={showConfirmPassword ? "text" : "password"} // Idem pour la confirmation du mot de passe
                    name="confirmPassword"
                    placeholder="Confirmez le mot de passe"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Inverser l'état de l'icône pour le mot de passe de confirmation
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <h1> </h1>
                <button type="submit">Suivant</button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <h1>Informations générales</h1>
              <form onSubmit={handleRegister}>
                <input
                  type="number"
                  name="age"
                  placeholder="Âge"
                  value={formData.age}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="city"
                  placeholder="Ville"
                  value={formData.city}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="favoriteDishes"
                  placeholder="Plats préférés (séparés par des virgules)"
                  value={formData.favoriteDishes}
                  onChange={(e) =>
                    setFormData({ ...formData, favoriteDishes: e.target.value.split(",") })
                  }
                />
                <button type="submit">S'inscrire</button>
              </form>
            </>
          )}
          <h1> </h1>

          {error && <p className="error">{error}</p>}
          <Link to="/">Déjà inscrit ? Se connecter</Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default RegistrationForm;
