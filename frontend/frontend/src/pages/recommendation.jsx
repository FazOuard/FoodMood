import React, { useState , useEffect} from "react";
import "./style.css";
import axios from "axios";
import RecipeCard from "../components/foodRecommanded";

const Recommendation = () => {
  const [formData, setFormData] = useState({
    Âge: "",
    Genre: "",
    Statut: "",
    Aimer_Plat_marocain: "",
    type_cuisine: "",
    Poids: "",
    Taille: "",
    duree_preparation: "",
    Sport_question: "",
    regime_question: "",
    Plat_consome: "",
  });

  const [recommendations, setRecommendations] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/recommendation", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData),
    });
    const result = await response.json();
    setRecommendations(result.recommendations); 
  };
  

  return (
    <div className="container">
      <h1 className="mt-5 text-center">FoodMood</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="Âge">Âge</label>
              <input
                type="number"
                className="form-control"
                id="Âge"
                name="Âge"
                value={formData.Âge}
                onChange={handleChange}
                step="any"
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="Genre">Genre</label>
              <select
                className="form-control"
                id="Genre"
                name="Genre"
                value={formData.Genre}
                onChange={handleChange}
                step="any"
                required
              >
                <option value="">-- Sélectionnez --</option>
                <option value="Femme">Femme</option>
                <option value="Homme">Homme</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="Statut">Statut</label>
              <select
                className="form-control"
                id="Statut"
                name="Statut"
                value={formData.Statut}
                onChange={handleChange}
                step="any"
                required
              >
                <option value="">-- Sélectionnez --</option>
                <option value="Étudiant">Étudiant</option>
                <option value="Fonctionnaire">Fonctionnaire</option>
                <option value="Retraité">Retraité</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="Aimer_Plat_marocain">
                Aimez-vous les plats marocains?
              </label>
              <select
                className="form-control"
                id="Aimer_Plat_marocain"
                name="Aimer_Plat_marocain"
                value={formData.Aimer_Plat_marocain}
                onChange={handleChange}
                step="any"
                required
              >
                <option value="">-- Sélectionnez --</option>
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="type_cuisine">Type de cuisine préférée</label>
              <select
                className="form-control"
                id="type_cuisine"
                name="type_cuisine"
                value={formData.type_cuisine}
                onChange={handleChange}
                step="any"
                required
              >
                <option value="">-- Sélectionnez --</option>
                <option value="Cuisine marocaine">Cuisine marocaine</option>
                <option value="Cuisine italienne">Cuisine italienne</option>
                <option value="Cuisine libanaise">Cuisine libanaise</option>
                <option value="Cuisine asiatique">Cuisine asiatique</option>
                <option value="Cuisine mexicaine">Cuisine mexicaine</option>
                <option value="Cuisine française">Cuisine française</option>
                <option value="Cuisine espagnole">Cuisine espagnole</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="Poids">Poids</label>
              <input
                type="number"
                className="form-control"
                id="Poids"
                name="Poids"
                step="any"
                value={formData.Poids}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="Taille">Taille</label>
              <input
                type="number"
                className="form-control"
                id="Taille"
                name="Taille"
                step="any"
                value={formData.Taille}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="duree_preparation">Durée de préparation</label>
              <select
                className="form-control"
                id="duree_preparation"
                name="duree_preparation"
                value={formData.duree_preparation}
                onChange={handleChange}
                required
              >
                <option value="">-- Sélectionnez --</option>
                <option value="15-30 minutes">15-30 minutes</option>
                <option value="30-60 minutes">30-60 minutes</option>
                <option value="1-3 heures">1-3 heures</option>
                <option value="Plus">Plus</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="Sport_question">Pratiquez-vous du sport</label>
              <select
                className="form-control"
                id="Sport_question"
                name="Sport_question"
                value={formData.Sport_question}
                onChange={handleChange}
                required
              >
                <option value="">-- Sélectionnez --</option>
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="regime_question">Suivez-vous un régime</label>
              <select
                className="form-control"
                id="regime_question"
                name="regime_question"
                value={formData.regime_question}
                onChange={handleChange}
                required
              >
                <option value="">-- Sélectionnez --</option>
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="Plat_consome">Les plats consommés le plus</label>
              <input
                type="text"
                className="form-control"
                id="Plat_consome"
                name="Plat_consome"
                value={formData.Plat_consome}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Voir la recommandation
          </button>
        </form>
      </div>

      {recommendations.length > 0 && (
        <div className="mt-5">
          <h2>Plats que vous pourriez préparer</h2>
          <div className="row">
            {recommendations.map((recipe, index) => (
              <div key={index} className="col-md-4">
                <div className="card recipe-card">
                  <img
                    className="card-img-top recipe-image"
                    src={recipe.Image}
                    alt={recipe.Titre}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{recipe.Titre}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}


    </div>
  );
};

export default Recommendation;
