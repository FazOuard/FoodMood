import React, { useState } from "react";
import "./Authentication.css";
import { useNavigate } from "react-router-dom";  // Pour la redirection
import { Link } from "react-router-dom";

function Authentication() {
  // Définition des états pour le nom d'utilisateur et le mot de passe
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  // Pour gérer l'erreur
  const navigate = useNavigate();  // Hook pour la redirection

  // Fonction pour gérer la soumission du formulaire
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Envoi des données d'authentification au backend
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),  // Envoi du nom d'utilisateur et du mot de passe
      });

      const data = await response.json();

      if (response.ok) {
        // Si la connexion réussit, rediriger vers le tableau de bord ou une autre page
        navigate("/dashboard");  // Remplacez "/dashboard" par l'URL vers laquelle vous voulez rediriger
      } else {
        // Si la connexion échoue, afficher le message d'erreur
        setError(data.error || "Une erreur est survenue.");
      }
    } catch (err) {
      setError("Erreur de connexion hello.");
    }
  };

  return (
    <div className="containerOfEverything">
    <div className="container">
    <div className="auth-container">
      <div className="auth-card">
        <h1>Log in</h1>
        <p>Welcome</p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}  // Mise à jour de l'état du nom d'utilisateur
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}  // Mise à jour de l'état du mot de passe
          />
          <button type="submit">Log In</button>
        </form>
        {error && <p className="error">{error}</p>}  {/* Affichage de l'erreur si présente */}
        <Link to="/Creat">Register</Link>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Authentication;
