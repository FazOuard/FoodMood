import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import "./Ingredients.css";


const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Modale pour ajout
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
    console.log("Ouverture modale avec :", ingredient);
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
    setIsAddModalOpen(false);
    setSelectedIngredient(null);
  };

  const openAddModal = () => {
    setFormData({
      Ingredient: '',
      Valeur: '',
      Unite: '',
      Prix: '',
    });
    setIsAddModalOpen(true);
  };

  // Mettre à jour les champs lorsqu'on modifie les inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Envoyer la mise à jour
  const handleUpdate = async () => {
    if (!selectedIngredient) return;
    console.log("Données envoyées :", formData);
    try {
      console.log("Ingrédient sélectionné :", selectedIngredient);
      await axios.put(`http://localhost:5000/ingredients/ingredients/${selectedIngredient.Id}`, formData);
      fetchIngredients();
      closeModal();
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };
  // Ajouter un ingrédient
  const handleAddIngredient = async () => {
    try {
      await axios.post('http://localhost:5000/ingredients/ingredients', formData);
      fetchIngredients();
      closeModal();
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'ingrédient :", error);
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
        <div className="pre_ing">
          
            <div className='rechercheTotalahlam'>
              <label className='searchPlatFaz'><FaSearch /></label>
              <input
                type="text"
                placeholder="Rechercher un plat..."
                className="serach_input"
              />
            </div>
          <button className="buttonAjouting" onClick={openAddModal}><FaPlus /> Ajouter un ingrédient</button>
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
                <td>{ingredient.Prix}</td>
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
        <div className="modal1">
          <div className='modal1-content'>
          <h3>Modifier l'Ingrédient</h3>
          <div className='blocks_all'>
          <div className='block_ingr'>
          <label>Nom:</label>
          <input type="text" name="Ingredient" value={formData.Ingredient} onChange={handleChange} />
          </div>
          <div className='block_ingr'>
          <label>Valeur:</label>
          <input type="number" name="Valeur" value={formData.Valeur} onChange={handleChange} />
          </div>
          <div className='block_ingr'>
          <label>Unité:</label>
          <input type="text" name="Unite" value={formData.Unite} onChange={handleChange} />
          </div>
          <div className='block_ingr'>
          <label>Prix :</label>
          <input type="text" name="Prix" value={formData.Prix} onChange={handleChange} />
          </div>
          </div>
          <div className='blok_bot'>
          <button onClick={handleUpdate}>OK</button>
          <button onClick={closeModal}>Annuler</button>
          </div>
          </div>

        </div>
      )}
      {/* Modale pour ajouter un ingrédient */}
      {isAddModalOpen && (
        <div className="modal1">
          <div className='modal1-content'>
            <h3>Ajouter un Nouvel Ingrédient</h3>
            <div className='blocks_all'>
              <div className='block_ingr'>
                <label>Nom:</label>
                <input type="text" name="Ingredient" value={formData.Ingredient} onChange={handleChange} />
              </div>
              <div className='block_ingr'>
                <label>Valeur:</label>
                <input type="number" name="Valeur" value={formData.Valeur} onChange={handleChange} />
              </div>
              <div className='block_ingr'>
                <label>Unité:</label>
                <input type="text" name="Unite" value={formData.Unite} onChange={handleChange} />
              </div>
              <div className='block_ingr'>
                <label>Prix :</label>
                <input type="text" name="Prix" value={formData.Prix} onChange={handleChange} />
              </div>
            </div>
            <div className='blok_bot'>
              <button onClick={handleAddIngredient}>Ajouter</button>
              <button onClick={closeModal}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ingredients;
