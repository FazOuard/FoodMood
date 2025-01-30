import React, { useEffect, useState } from 'react';
import "./Plats.css";
import { FaArrowLeft, FaArrowRight, FaClock, FaEye, FaPen, FaSearch, FaTrash, FaYoutube } from 'react-icons/fa'; // Import des icônes
import { IoCloseSharp, IoFastFoodOutline } from "react-icons/io5";
import { AiOutlineHolder } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";

const PlatsAdmin = () => {
  const [data, setData] = useState([]); // état pour stocker les données récupérées
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Nombre d'éléments par page
  const [addModalOpen, setAddModalOpen] = useState(false); // Contrôle de l'ouverture de la fenêtre modale pour ajouter
  const [editModalOpen, setEditModalOpen] = useState(false); // Contrôle de l'ouverture de la fenêtre modale pour modifier
  const [editModalOpen2, setEditModalOpen2] = useState(false);
  const [informationModalOpen, setinformationModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Contrôle de l'ouverture de la fenêtre modale pour supprimer
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false); // Contrôle de l'ouverture de la fenêtre modale pour confirmation
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedTri, setSelectedTri] = useState("");
  const [modifiedPlat, setModifiedPlat] = useState(null);
  const [selectedPlat, setSelectedPlat] = useState(null); // Plat sélectionné pour modification ou suppression
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredPlats = data.filter((item) => {
    const matchDuration = selectedTri ? item.Duree === selectedTri : true;
    const matchSearch = searchTerm ? item.Titre.toLowerCase().includes(searchTerm.toLowerCase()) : true;
  
    return matchDuration && matchSearch; 
  });
  
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPlats.slice(indexOfFirstItem, indexOfLastItem);
  
  // Recalculer le nombre total de pages en fonction des résultats filtrés
  const totalPages = Math.ceil(filteredPlats.length / itemsPerPage);

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
  
  const openinformationModal = (plat) => {
    console.log("Ouverture de la modale de modification", plat); 
    setSelectedPlat(plat);
    setinformationModalOpen(true); 
  };
  const closeinformationModal = (plat) => {
    
    setinformationModalOpen(false); 
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
  

 
  return (
    <div>
      <div className="ActionsbeforeFaz">
        <button className="buttonAjoutPlatFaz" onClick={openAddModal}><FaPlus /> Ajouter un plat</button>
        <div className='selectionmultipleFaz'>
          <div className='rechercheTotalFaz'>
            <label className='searchPlatFaz'><FaSearch /></label>
            <input
              type="text"
              placeholder="Rechercher un plat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 rounded"
            />
          </div>
          <select className='triFaz' value={selectedTri} onChange={(e) => setSelectedTri(e.target.value)}>
            <option value="">Duree</option> 
            <option value="15-30 minutes">15-30 minutes</option>
            <option value="30-60 minutes">30-60 minutes</option>
            <option value="1-3 heures">1-3 heures</option>
            <option value="Plus">Plus</option>
          </select>
        </div>
      </div>
      <div className="tableauFaz1">
        <table className="data-table1">
          <thead>
          
            <tr>
             
              <th>Titre</th>
              <th>Recette</th>
              <th>Duree</th>
              <th>Ingredients</th>
             {/** <th>Calories</th>
              <th>Proteines</th>
              <th>Lipides</th>
              <th>Glucides</th>
              <th>Youtube</th>
              <th>Image</th>
              <th>Cuisine</th>
              <th>Cathegorie</th>*/} 
              <th>Operations</th>
            </tr>
         
          </thead>
          <tbody>
            
            {currentItems.map((item, index) => (
              
              <tr key={index} onClick={() => setSelectedPlat(item)}>
                
                <td>{item.Titre}</td>
                <td>{item.Recette}</td>
                <td>{item.Duree}</td>
                <td>{item.Ingredients}</td>
               {/**<td>{item.Calories}</td>
                <td>{item.Proteines}</td>
                <td>{item.Lipides}</td>
                <td>{item.Glucides}</td>
                 <td>{item.Youtube}</td>
                <td>{item.Image}</td>
                <td>{item.Cuisine}</td>
                <td>{item.Cathegorie}</td>*/}
                <td className='operationsFaz'>
                  <button className='buttonOperationsFaz' onClick={() => openinformationModal(item)}><FaEye /></button>
                  <button className="buttonOperationsFaz" onClick={() => openEditModal2(item)}><FaPen /></button>
                  <button className="buttonOperationsFaz trashF" onClick={() => openDeleteModal(item)}><FaTrash/></button>
                </td>
                
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
          <button className="close-btnUserFaz" onClick={closeAddModal}><IoCloseSharp /></button>
            <form onSubmit={e => e.preventDefault()}>
              <div className="form-groupFaz">
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
              <div className="form-groupFaz">
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
              <div className="form-groupFaz">
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
              <div className="form-groupFaz">
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
              <div className="form-groupFaz">
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
              <div className="form-groupFaz">
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
                <button className="YesDelete" onClick={handleSubmit}>Ajouter</button>
              </div>

            </form>
          </div>
        </div>
      )}

      {editModalOpen2 &&(
        <div className="modal">
          <div className="modal-content">
          <button className="close-btnUserFaz" onClick={closeEditModal2}><IoCloseSharp/></button>
          <h2 className='supprimerTitleFaz'> Modifier un plat</h2>
          <p className='paragrapheSupprimer'>Vous pouvez modifier les champs ci-dessous</p>
            <form onSubmit={e => e.preventDefault()}>
              <div className="form-groupFaz">
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
              <div className="form-groupFaz">
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

              <div className="form-groupFaz">
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
              <div className="form-groupFaz">
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
              <div className="form-groupFaz">
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
              <div className="form-groupFaz">
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
            <div className="confirmationsupprimerPlat">
              <button className="noDelete"  onClick={closeEditModal2}>Annuler</button>
              <button className="YesDelete" onClick={handleEditSubmit}>Enregistrer</button>
              
            </div>
          </div>
        </div>

      )
      }
      {deleteModalOpen  && (
        <div className="modalsupprimerFaz">
          <div className="modal-contentsupprimerFaz">
            <h2 className='supprimerTitleFaz'> Supprimer un plat</h2>
            <p className='paragrapheSupprimer'>Voulez-vous vraiment supprimer ce plat ?</p>
            <div className="confirmationsupprimerPlat">
              
              <button className="noDelete" onClick={closeDeleteModal}>Non</button>
              <button className="YesDelete" onClick={handleDelete}>Oui</button>

            </div>

          </div>
        </div>
      )}

      {informationModalOpen && (
        <div className='modalInformation'>
          <div className='modal-contentInformation'>
          <button onClick={closeinformationModal} className='close-btnUserFaz'><IoCloseSharp /></button>
          <div className='nameInformationPlats'>
            <img src={selectedPlat.Image} alt="Plat" className='imageDetailsPlats'/>
            <div className='titreFazYoutube'>
              <h3>{selectedPlat.Titre}</h3>
              <p className='categorieFaz'><strong>Catégorie:</strong> {selectedPlat.Cathegorie}</p>
              
              <p><strong>Cuisine:</strong> {selectedPlat.Cuisine}</p>
            </div>

          </div>
          
          <div className='musclesFaz'>
          
            <p><strong>Calories:</strong><br/> {selectedPlat.Calories}</p>
            <p><strong>Protéines:</strong><br/> {selectedPlat.Proteines}</p>
            <p><strong>Lipides:</strong><br/> {selectedPlat.Lipides}</p>
            <p><strong>Glucides:</strong><br/> {selectedPlat.Glucides}</p>

          </div>

          <p className='youtubeisYoutubing'><FaYoutube />   <a href={selectedPlat.Youtube} target="_blank" rel="noopener noreferrer">Voir la vidéo</a></p>
          <p><FaClock />    {selectedPlat.Duree}</p>
          <p><strong>Recette</strong></p>
          <p>{selectedPlat.Recette}</p>
          <p><strong>Ingredients</strong></p>
          <p>{selectedPlat.Ingredients}</p>
          </div>
        </div>

      )}


    </div>
  );
};

export default PlatsAdmin;
