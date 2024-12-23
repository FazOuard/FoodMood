import React from "react";

const RecipeCard = ({ recipe }) => (
  <div className="col-md-4">
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
);

export default RecipeCard;
