import React, { useEffect, useState } from 'react';
import "./Plats.css";
import { FaArrowLeft, FaArrowRight, FaCheckCircle, FaClock, FaEye, FaPen, FaSearch, FaTrash, FaYoutube } from 'react-icons/fa'; // Import des icônes
import { IoCloseSharp, IoFastFoodOutline } from "react-icons/io5";
import { AiOutlineHolder } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { IoMdCloseCircle } from 'react-icons/io';

const Confirmer = () => {
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
    fetch("http://localhost:5000/validation")
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

  const openAddModal = (plat) => {
    setAddModalOpen(true); // Ouvrir la fenêtre modale d'ajout
    setNewPlat(plat);
    setSelectedPlat(plat);
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
    if (deleteModalOpen && selectedPlat) {
      setSelectedPlat(prev => ({
        ...prev,
        [name]: value
      }));
    } 
    
    if (addModalOpen && selectedPlat) {
      setNewPlat(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      console.log(selectedPlat);
      console.log(newPlat);
  
      // Ajouter le plat
      const response = await fetch("http://localhost:5000/data/add", {
        method: 'POST',
        body: JSON.stringify(newPlat),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du plat");
      }
  
      const newData = await response.json();
      setData((prevData) => [...prevData, newData]); // Mise à jour de l'état avec le nouvel élément
      
      // Ajouter les éléments dans la table IngredientsPlat
      const ingredientsData = {
        idPlat: selectedPlat.id, // L'ID du plat ajouté
        idIng: selectedPlat.idIng, // L'ID de l'ingrédient sélectionné
        Quantite: selectedPlat.Quantite, // La quantité d'ingrédient
      };
  
      // Envoi des données vers la table IngredientsPlat
      const ingredientsResponse = await fetch("http://localhost:5000/ingplatAdmin/add", {
        method: 'POST',
        body: JSON.stringify(ingredientsData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!ingredientsResponse.ok) {
        throw new Error("Erreur lors de l'ajout des ingrédients au plat");
      }
  
      const ingredientsResult = await ingredientsResponse.json();
      console.log("Ingrédients ajoutés avec succès :", ingredientsResult);
      
      if (selectedPlat) {
        handleDelete(); // Supprimer l'élément si nécessaire
      }
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
    fetch(`http://localhost:5000/validation/${selectedPlat.id}`, {
      method: 'DELETE',
    })
    .then(() => {
      setData(prevData => prevData.filter(item => item.id !== selectedPlat.id));
    });
    closeDeleteModal();
  };

 

 
  return (
    <div>
      <div className="ActionsbeforeFaz">
        <h2>Confirmer l'ajout d'un plat ou non</h2>
      </div>
      <div className="tableauFaz1">
        <table className="data-table1">
          <thead>
          
            <tr>
             
              <th>Titre</th>
              <th>Recette</th>
              <th>Duree</th>
              <th>Ingredients</th>
             
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
              
                <td className='operationsFaz'>
                  <button className='buttonOperationsFaz' onClick={() => openinformationModal(item)}><FaEye /></button>
                  <button className="buttonOperationsFaz" onClick={() => openAddModal(item)}><FaCheckCircle /></button>
                  <button className="buttonOperationsFaz trashF" onClick={() => openDeleteModal(item)}><IoMdCloseCircle /></button>
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
        <div className="modalsupprimerFaz">
          <div className="modal-contentsupprimerFaz">
          <h2 className='supprimerTitleFaz'>Ajouter un nouveau plat</h2>
          <p className='paragrapheSupprimer'>Voulez-vous vraiment ajouter ce plat ?</p>
          <button className="close-btnUserFaz" onClick={closeAddModal}><IoCloseSharp /></button>
         
          <div className="confirmationsupprimerPlat">
              
              <button className="noDelete" onClick={closeAddModal}>Non</button>
              <button className="YesDelete" onClick={handleSubmit}>Oui</button>

            </div>
          </div>
        </div>
      )}

     
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
          <p>{selectedPlat.idIng}</p>
          <p>{selectedPlat.Quantite}</p>
          </div>
        </div>

      )}


    </div>
  );
};

export default Confirmer;
