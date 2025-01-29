import React, { useState } from "react";
import "./ajouterPlat.css";

function AjouterPlat() {
  const [formData, setFormData] = useState({
    titre: "",
    cuisine: "",
    categorie: "",
    duree: "",
    calories: "",
    proteines: "",
    lipides: "",
    glucides: "",
    image: null,
    ingredients: "",
    recette: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] }); // Handling file input
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Vérification des champs requis (seuls le titre, l'image, les ingrédients et la recette sont requis)
    if (!formData.titre || !formData.image || !formData.ingredients || !formData.recette) {
      setError("Le titre, l'image, les ingrédients et la recette sont obligatoires.");
      return;
    }

    // Si vous utilisez une URL d'image, vous pouvez directement assigner l'URL
    const imageURL = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.freepik.com%2Fphotos-premium%2Ffarine-avoine-bol-bouillie-avoine-bananes-mures-graines-chia-fond-table-ancienne-beton-gris-vue-dessus-dans-style-plat-ingredients-naturels-petit-dejeuner-chaud-sain-aliments-dietetiques_253362-20257.jpg%3Fw%3D1480&f=1&nofb=1&ipt=6e107d8f17a84297da81df6801b83ce5448e83720dcb1d8918a8a9ee72c4d911&ipo=images";
    const formDataObj = new FormData();

    // Remplacer le champ image avec l'URL
    formData.image = imageURL;

    for (const key in formData) {
      formDataObj.append(key, formData[key]);
    }

    try {
      const response = await fetch("http://localhost:5000/api/ajouter/addDish", {
        method: "POST",
        body: formDataObj,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("Plat ajouté avec succès !");
      } else {
        setError(data.error || "Erreur lors de l'ajout du plat.");
      }
    } catch (err) {
      setError("Une erreur réseau est survenue.");
    }
  };


  return (
    <div className="all-ajout">
      <h1>Ajouter un plat</h1>
      <div className="ajout-form">
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Titre :</label>
            <input
              type="text"
              name="titre"
              value={formData.titre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Cuisine :</label>
            <select
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
            >
              <option value="">Sélectionner une cuisine</option>
              <option value="marocaine">Marocaine</option>
              <option value="italienne">Italienne</option>
              <option value="française">Française</option>
              <option value="asiatique">Asiatique</option>
              <option value="mexicaine">Mexicaine</option>
            </select>
          </div>
          <div className="form-group">
            <label>Catégorie :</label>
            <select
              name="categorie"
              value={formData.categorie}
              onChange={handleChange}
            >
              <option value="">Sélectionner une catégorie</option>
              <option value="entrée">Entrée</option>
              <option value="plat_principal">Plat principal</option>
              <option value="dessert">Dessert</option>
              <option value="boisson">Boisson</option>
            </select>
          </div>
          <div className="form-group">
            <label>Durée de préparation :</label>
            <select
              name="duree"
              value={formData.duree}
              onChange={handleChange}
            >
              <option value="">Sélectionner une durée</option>
              <option value="15">15 min</option>
              <option value="30">30 min</option>
              <option value="45">45 min</option>
              <option value="60">1 heure</option>
              <option value="plus">Plus d'une heure</option>
            </select>
          </div>
          <div className="form-group">
            <label>Calories :</label>
            <input
              type="number"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Protéines (g) :</label>
            <input
              type="number"
              name="proteines"
              value={formData.proteines}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Lipides (g) :</label>
            <input
              type="number"
              name="lipides"
              value={formData.lipides}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Glucides (g) :</label>
            <input
              type="number"
              name="glucides"
              value={formData.glucides}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Image :</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Ingrédients :</label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Recette :</label>
            <textarea
              name="recette"
              value={formData.recette}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="submit-btn">
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}

export default AjouterPlat;
