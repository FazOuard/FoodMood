import React, { useEffect, useState } from 'react';
import "./Plats.css";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import des icônes
import { IoFastFoodOutline } from "react-icons/io5";
import { AiOutlineHolder } from "react-icons/ai";

const PlatsAdmin = () => {
  const [data, setData] = useState([]); // état pour stocker les données récupérées
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2); // Nombre d'éléments par page
  const [addModalOpen, setAddModalOpen] = useState(false); // Contrôle de l'ouverture de la fenêtre modale pour ajouter
  const [editModalOpen, setEditModalOpen] = useState(false); // Contrôle de l'ouverture de la fenêtre modale pour modifier
  const [editModalOpen2, setEditModalOpen2] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Contrôle de l'ouverture de la fenêtre modale pour supprimer
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false); // Contrôle de l'ouverture de la fenêtre modale pour confirmation
  const [selectedAction, setSelectedAction] = useState("");
  const [modifiedPlat, setModifiedPlat] = useState(null);
  const [selectedPlat, setSelectedPlat] = useState(null); // Plat sélectionné pour modification ou suppression
  const [newPlat, setNewPlat] = useState({
    Titre: '',
    Recette: '',
    Duree: '',
    Ingredients: '',
    Calories: '',
    Proteines: '',
    Lipides: '',
    Glucides: '',
    Youtube: '',
    Image: '',
    Cuisine: '',
    Cathegorie: ''
  });

  useEffect(() => {
    fetch("http://localhost:5000/data")
      .then((response) => response.json())
      .then((data) => {
        setData(data); // Mise à jour de l'état avec les données récupérées
      });
  }, []);

  // Calcul de la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const openAddModal = () => {
    setAddModalOpen(true); // Ouvrir la fenêtre modale d'ajout
  };

  const closeAddModal = () => {
    setAddModalOpen(false); // Fermer la fenêtre modale d'ajout
    resetForm();
  };

  const openEditModal = (plat) => {
    console.log("Ouverture de la modale de modification", plat); 
    setSelectedPlat(plat);
    setEditModalOpen(true); // Ouvrir la fenêtre modale de modification
  };

  const closeEditModal = () => {
    setEditModalOpen(false); // Fermer la fenêtre modale de modification
    resetForm();
  };
  const openEditModal2 = (plat) => {
    console.log("Ouverture de la modale de modification", plat); 
    setModifiedPlat(plat || {}); // Évite undefined
    setEditModalOpen2(true);
  };
  

  const closeEditModal2 = () => {
    setEditModalOpen2(false); // Fermer la fenêtre modale de modification
    resetForm();
  };

  const openDeleteModal = (plat) => {
    setSelectedPlat(plat);
    setDeleteModalOpen(true); // Ouvrir la fenêtre modale de suppression
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false); // Fermer la fenêtre modale de suppression
    setSelectedPlat(null);
  };

  const openConfirmationModal = () => {
    setConfirmationModalOpen(true); // Ouvrir la fenêtre modale de confirmation
  };

  const closeConfirmationModal = () => {
    setConfirmationModalOpen(false); // Fermer la fenêtre modale de confirmation
  };

  const resetForm = () => {
    setNewPlat({
      Titre: '',
      Recette: '',
      Duree: '',
      Ingredients: '',
      Calories: '',
      Proteines: '',
      Lipides: '',
      Glucides: '',
      Youtube: '',
      Image: '',
      Cuisine: '',
      Cathegorie: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (editModalOpen2 && modifiedPlat) {
      setModifiedPlat(prev => ({
        ...prev,
        [name]: value
      }));
    } 
    if (deleteModalOpen && selectedPlat) {
      setSelectedPlat(prev => ({
        ...prev,
        [name]: value
      }));
    } 
    
    if (addModalOpen && newPlat) {
      setNewPlat(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/data/add", {
        method: 'POST',
        body: JSON.stringify(newPlat),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du plat");
      }
  
      const newData = await response.json();
      setData(prevData => [...prevData, newData]); // Mise à jour de l'état avec le nouvel élément
      closeAddModal();
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  };
  

  const handleDelete = () => {
    if (!selectedPlat) {
      console.error("Aucun plat sélectionné pour suppression.");
      return;
    }
    // Suppression du plat
    fetch(`http://localhost:5000/data/${selectedPlat.id}`, {
      method: 'DELETE',
    })
    .then(() => {
      setData(prevData => prevData.filter(item => item.id !== selectedPlat.id));
    });
    closeDeleteModal();
  };

  const handleEditSubmit = async () => {
    if (!modifiedPlat) {
      console.error("Aucun plat sélectionné pour modification.");
      return;
    }
  
    try {
      // Créer une copie propre pour éviter les références cycliques
      const platToSend = { ...modifiedPlat };
  
      const response = await fetch(`http://localhost:5000/data/${modifiedPlat.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(platToSend),
      });
  
      if (!response.ok) {
        throw new Error("Échec de la mise à jour du plat");
      }
  
      const updatedPlat = await response.json();
      setData((prevData) =>
        prevData.map((item) =>
          item.id === modifiedPlat.id ? updatedPlat : item
        )
      );
      closeEditModal2();  // Attention, c'est `closeEditModal2` et pas `closeEditModal`
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };
  

  const handleActionChange = (e) => {
    setSelectedAction(e.target.value);
  };
  
  const handleActionClick = () => {
    if (selectedAction === "Ajout") openAddModal();
    else if (selectedAction === "Modification" ) openEditModal(selectedPlat);
    else if (selectedAction === "Suppression" ) openDeleteModal(selectedPlat);
    else if (selectedAction === "Utilisateur") openConfirmationModal();
  };

  return (
    <div>
       <div>
        <h1 className='quoiFaz'>Que désiriez-vous effectuer ?</h1>
        <div className='buttonAjoutPlat'>   
          <select className='selectFaz' onChange={handleActionChange} value={selectedAction}>
            <option value="">Sélectionner une action</option>
            <option value="Ajout">Ajouter un plat</option>
            <option value="Modification">Modifier un plat</option>
            <option value="Suppression">Supprimer un plat</option>
            <option value="Utilisateur">Confirmer un ajout d'un plat par utilisateur</option>
          </select>
          <button className='AllonsYFaz' onClick={handleActionClick}>Allons-y!</button>
        </div>
      </div>
      <br />
      
      <h1 className='quoiFaz'><IoFastFoodOutline /> Plats</h1>
     
      <div className="tableauFaz1">
        <table className="data-table1">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Recette</th>
              <th>Duree</th>
              <th>Ingredients</th>
              <th>Calories</th>
              <th>Proteines</th>
              <th>Lipides</th>
              <th>Glucides</th>
              <th>Youtube</th>
              <th>Image</th>
              <th>Cuisine</th>
              <th>Cathegorie</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index} onClick={() => setSelectedPlat(item)}>
                <td>{item.Titre}</td>
                <td>{item.Recette}</td>
                <td>{item.Duree}</td>
                <td>{item.Ingredients}</td>
                <td>{item.Calories}</td>
                <td>{item.Proteines}</td>
                <td>{item.Lipides}</td>
                <td>{item.Glucides}</td>
                <td>{item.Youtube}</td>
                <td>{item.Image}</td>
                <td>{item.Cuisine}</td>
                <td>{item.Cathegorie}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          <FaArrowLeft />
        </button>
        <span>{currentPage} sur {totalPages}</span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          <FaArrowRight />
        </button>
      </div>

      {/* Fenêtres modales */}
      {addModalOpen && (
        <div className="modal">
          <div className="modal-content">
          <h2>Ajouter un nouveau plat</h2>
          <button className="close-btnUserFaz" onClick={closeAddModal}>x</button>
            <form onSubmit={e => e.preventDefault()}>
              <div className="form-group">
                <input
                  type="text"
                  name="Titre"
                  placeholder="Titre"
                  value={newPlat.Titre}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="Recette"
                  placeholder="Recette"
                  value={newPlat.Recette}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="Duree"
                  placeholder="Durée"
                  value={newPlat.Duree}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="Ingredients"
                  placeholder="Ingrédients"
                  value={newPlat.Ingredients}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="Calories"
                  placeholder="Calories"
                  value={newPlat.Calories}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="Proteines"
                  placeholder="Protéines"
                  value={newPlat.Proteines}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="Lipides"
                  placeholder="Lipides"
                  value={newPlat.Lipides}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="Glucides"
                  placeholder="Glucides"
                  value={newPlat.Glucides}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="Youtube"
                  placeholder="Youtube"
                  value={newPlat.Youtube}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="Image"
                  placeholder="Image"
                  value={newPlat.Image}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="Cuisine"
                  placeholder="Cuisine"
                  value={newPlat.Cuisine}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="Cathegorie"
                  placeholder="Catégorie"
                  value={newPlat.Cathegorie}
                  onChange={handleChange}
                />
              </div>
              <div className="buttonAjoutPlat">
                <button className="ajoutplat" onClick={handleSubmit}>Ajouter</button>
              </div>

            </form>
          </div>
        </div>
      )}

      {editModalOpen  && (
        <div className="modal">
          <div className="modal-content">
            <h2>Modifier un plat</h2>
          <button className="close-btnUserFaz" onClick={closeEditModal}>x</button>

            <select onChange={(e) => {
              const selectedId = Number(e.target.value); // Assurer que l'id est un nombre
              const selected = data.find(plat => plat.id === selectedId);
              console.log("Plat sélectionné :", selected); // Vérifie ce qui est sélectionné
              setSelectedPlat(selected); // Met à jour selectedPlat
            }}>
              {data.map(plat => (
                <option key={plat.id} value={plat.id}>{plat.Titre}</option>
              ))}
            </select>
           {/**  <form onSubmit={e => e.preventDefault()}>
              <div className="form-group">
                <input
                  type="text"
                  name="Titre"
                  placeholder="Titre"
                  value={selectedPlat.Titre}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="Recette"
                  placeholder="Recette"
                  value={selectedPlat.Recette}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="Duree"
                  placeholder="Durée"
                  value={selectedPlat.Duree}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="Ingredients"
                  placeholder="Ingrédients"
                  value={selectedPlat.Ingredients}
                  onChange={handleChange}
                />  
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="Calories"
                  placeholder="Calories"
                  value={selectedPlat.Calories}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="Proteines"
                  placeholder="Protéines"
                  value={selectedPlat.Proteines}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="Lipides"
                  placeholder="Lipides"
                  value={selectedPlat.Lipides}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="Glucides"
                  placeholder="Glucides"
                  value={selectedPlat.Glucides}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="Youtube"
                  placeholder="Youtube"
                  value={selectedPlat.Youtube}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="Image"
                  placeholder="Image"
                  value={selectedPlat.Image}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="Cuisine"
                  placeholder="Cuisine"
                  value={selectedPlat.Cuisine}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="Cathegorie"
                  placeholder="Catégorie"
                  value={selectedPlat.Cathegorie}
                  onChange={handleChange}
                />
              </div>
            </form>*/}

            <button onClick={openEditModal2}>Enregistrer</button>
            <button onClick={closeEditModal}>Annuler</button>
          </div>
        </div>
      )}


      {editModalOpen2 &&(
        <div className="modal">
          <div className="modal-content">
            <h2>Modifier un plat</h2>
            <form onSubmit={e => e.preventDefault()}>
              <div className="form-group">
                <input
                  type="text"
                  name="Titre"
                  placeholder="Titre"
                  value={modifiedPlat?.Titre || ""}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="Recette"
                  placeholder="Recette"
                  value={modifiedPlat?.Recette || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="Duree"
                  placeholder="Durée"
                  value={modifiedPlat?.Duree || ""}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="Ingredients"
                  placeholder="Ingrédients"
                  value={modifiedPlat?.Ingredients || ""}
                  onChange={handleChange}
                />  
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="Calories"
                  placeholder="Calories"
                  value={modifiedPlat?.Calories || ""}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="Proteines"
                  placeholder="Protéines"
                  value={modifiedPlat?.Proteines || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="Lipides"
                  placeholder="Lipides"
                  value={modifiedPlat?.Lipides || ""}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="Glucides"
                  placeholder="Glucides"
                  value={modifiedPlat?.Glucides || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="Youtube"
                  placeholder="Youtube"
                  value={modifiedPlat?.Youtube || ""}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="Image"
                  placeholder="Image"
                  value={modifiedPlat?.Image || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="Cuisine"
                  placeholder="Cuisine"
                  value={modifiedPlat?.Cuisine || ""}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="Cathegorie"
                  placeholder="Catégorie"
                  value={modifiedPlat?.Cathegorie || ""}
                  onChange={handleChange}
                />
              </div>
            </form>
            <button onClick={handleEditSubmit}>Enregistrer</button>
            <button onClick={closeEditModal2}>Annuler</button>
          </div>
        </div>

      )
      }
      {deleteModalOpen  && (
        <div className="modal">
          <div className="modal-content">
            <h2>Voulez-vous vraiment supprimer ce plat ?</h2>
            <select onChange={(e) => {
              const selectedId = Number(e.target.value); // Assurer que l'id est un nombre
              const selected = data.find(plat => plat.id === selectedId);
              console.log("Plat sélectionné :", selected); // Vérifie ce qui est sélectionné
              setSelectedPlat(selected); // Met à jour selectedPlat
            }}>
              {data.map(plat => (
                <option key={plat.id} value={plat.id}>{plat.Titre}</option>
              ))}
            </select>

            <button onClick={handleDelete}>Oui</button>
            <button onClick={closeDeleteModal}>Non</button>
          </div>
        </div>
      )}

      {confirmationModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirmer l'ajout par un utilisateur</h2>
            <button onClick={closeConfirmationModal}>Confirmer</button>
            <button onClick={closeConfirmationModal}>Annuler</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlatsAdmin;
