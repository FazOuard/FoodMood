import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import "./Ingredients.css";


const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    Ingredient: '',
    Valeur: '',
    Unite: '',
    Prix: '',
  });

  // Charger les ingrédients depuis l'API
  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/ingredients/ingredients');
      setIngredients(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des ingrédients:', error);
    }
  };

  // Ouvrir la modale avec les valeurs actuelles
  const openModal = (ingredient) => {
    setSelectedIngredient(ingredient);
    setFormData({
      Ingredient: ingredient.Ingredient,
      Valeur: ingredient.Valeur,
      Unite: ingredient.Unite,
      Prix: ingredient.Prix,
    });
    setIsModalOpen(true);
  };

  // Fermer la modale
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedIngredient(null);
  };

  // Mettre à jour les champs lorsqu'on modifie les inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Envoyer la mise à jour
  const handleUpdate = async () => {
    if (!selectedIngredient) return;

    try {
      await axios.put(`http://localhost:5000/ingredients/ingredients/${selectedIngredient.Id}`, formData);
      fetchIngredients();
      closeModal();
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  // Supprimer un ingrédient
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/ingredients/ingredients/${id}`);
      setIngredients(ingredients.filter((ingredient) => ingredient.Id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  return (
    
    <div className="page_ingrediants">
      

      <div className="ingredients">
        <h1 className="text">Ingrédients</h1>
        <div className="pre-ing">
          <div className='selectionmultipleFaz'>
            <div className='rechercheTotalFaz'>
              <label className='searchPlatFaz'><FaSearch /></label>
              <input
                type="text"
                placeholder="Rechercher un plat..."
                className="border p-2 rounded"
              />
            </div>
          </div>

          <button className="buttonAjouting"><FaPlus /> Ajouter un ingrédient</button>
        </div>
        
        <table className="ingredients-table">
          <thead>
            <tr>
              <th>Ingrédients</th>
              <th>Valeur</th>
              <th>Unité</th>
              <th>Prix</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ingredient, index) => (
              <tr key={index}>
                <td>{ingredient.Ingredient}</td>
                <td>{ingredient.Valeur}</td>
                <td>({ingredient.Unite})</td>
                <td>{ingredient.Prix}€</td>
                <td className="actions">
                  <button className="edit-btn" onClick={() => openModal(ingredient)}>
                    <FaEdit size={18} />
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(ingredient.Id)}>
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modale pour modifier un ingrédient */}
      {isModalOpen && (
        <div className="modal">
          <div className='modal-content'>
          <h3>Modifier l'Ingrédient</h3>
          <label>Nom:</label>
          <input type="text" name="Ingredient" value={formData.Ingredient} onChange={handleChange} />

          <label>Valeur:</label>
          <input type="number" name="Valeur" value={formData.Valeur} onChange={handleChange} />

          <label>Unité:</label>
          <input type="text" name="Unite" value={formData.Unite} onChange={handleChange} />

          <label>Prix :</label>
          <input type="text" name="Prix" value={formData.Prix} onChange={handleChange} />

          <button onClick={handleUpdate}>OK</button>
          <button onClick={closeModal}>Annuler</button>
          </div>

        </div>
      )}
    </div>
  );
};

export default Ingredients;
