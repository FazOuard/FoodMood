import React, { useState } from "react";
import "./ajouterPlat.css";
import AjoutTemp from "../../assets/icons/AjoutTemp.png"

function AjouterPlat() {
  const [imageUrl2, setImageUrl2] = useState(null);
  const [formData, setFormData] = useState({
    titre: "",
    cuisine: "",
    categorie: "",
    duree: "",
    calories: "",
    proteines: "",
    lipides: "",
    glucides: "",
    image: "",
    ingredients: "",
    recette: "",
  });
  const [error, setError] = useState("");
  console.log("this is formData: ", formData)
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] }); // Handling file input
    } else {
      console.log(name)
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleChangeImage = (event) => {
    const file = event.target.files[0]; 
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl2(url);
      setFormData({...formData, ["image"]: url})
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

    // // Si vous utilisez une URL d'image, vous pouvez directement assigner l'URL
    // const imageURL = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.freepik.com%2Fphotos-premium%2Ffarine-avoine-bol-bouillie-avoine-bananes-mures-graines-chia-fond-table-ancienne-beton-gris-vue-dessus-dans-style-plat-ingredients-naturels-petit-dejeuner-chaud-sain-aliments-dietetiques_253362-20257.jpg%3Fw%3D1480&f=1&nofb=1&ipt=6e107d8f17a84297da81df6801b83ce5448e83720dcb1d8918a8a9ee72c4d911&ipo=images";
    const formDataObj = new FormData();

    // // Remplacer le champ image avec l'URL
    // formData.image = imageURL;

    for (const key in formData) {
      formDataObj.append(key, formData[key]);
    }
    console.log("this is formdata inside the call: ", formData)
    try {
      const response = await fetch("http://localhost:5000/api/ajouter/addDish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
          <div className="form-half">

            <div className="form-two-inputs2">
              <div className="form-group2">
                <h4>Titre :</h4>
                <input
                  type="text"
                  name="titre"
                  value={formData.titre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group2">
                <h4>Cuisine :</h4>
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
            </div>
            
            <div className="form-two-inputs2">
              <div className="form-group2">
                <h4>Catégorie :</h4>
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
              <div className="form-group2">
                <h4>Durée de préparation :</h4>
                <select
                  name="duree"
                  value={formData.duree}
                  onChange={handleChange}
                >
                  <option value="">Sélectionner la durée</option>
                  <option value="15">15 min</option>
                  <option value="30">30 min</option>
                  <option value="45">45 min</option>
                  <option value="60">1 heure</option>
                  <option value="plus">Plus d'une heure</option>
                </select>
              </div>
              
            </div>

            <div className="form-four-inputs2">
              <div className="form-group3">
                <h4>Calories (Kcal) :</h4>
                <input
                  type="number"
                  name="calories"
                  value={formData.calories}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group3">
                <h4>Protéines (g) :</h4>
                <input
                  type="number"
                  name="proteines"
                  value={formData.proteines}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group3">
                <h4>Lipides (g) :</h4>
                <input
                  type="number"
                  name="lipides"
                  value={formData.lipides}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group3">
                <h4>Glucides (g) :</h4>
                <input
                  type="number"
                  name="glucides"
                  value={formData.glucides}
                  onChange={handleChange}
                />
              </div>
            </div>

            
            <div className="form-group0">
              <h4>Ingrédients :</h4>
              <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group0">
              <h4>Recette :</h4>
              <textarea
                name="recette"
                value={formData.recette}
                onChange={handleChange}
                required
              />
            </div>

          </div>
          <div className="form-vertical-line"/>
          <div className="form-half">
            
            <div className="form-group1">
              <h4>Image :</h4>
              <input
                type="file"
                name="image"
                onChange={handleChangeImage}
                required
              />
            </div>
            <div className="form-img">
              {imageUrl2? 
                <img src={imageUrl2} alt={AjoutTemp}/>
                :
                <img src={AjoutTemp}/>}
            </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="submit-btn">
            Envoyer
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AjouterPlat;
