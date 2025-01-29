import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import "./ManageUsers.css";

const ManageUsers = () => {
  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [visibleCount, setVisibleCount] = useState(10); // Nombre max affiché
  const [ageFilter, setAgeFilter] = useState(""); // Filtre par âge
  const [genreFilter, setGenreFilter] = useState(""); // Filtre par genre

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/userPreference");
        const data = await response.json();
        setUsersData(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);


  // Fonction pour filtrer les utilisateurs
  const filteredUsers = usersData
    .filter((user) => {
      if (ageFilter) {
        return user.age === parseInt(ageFilter, 10);  // Filtre par âge
      }
      return true;
    })
    .filter((user) => {
      if (genreFilter) {
        return user.Genre === genreFilter; // Filtre par genre
      }
      return true;
    });

    const handleDelete = () => {
      if (!selectedPlat) {
        console.error("Aucun plat sélectionné pour suppression.");
        return;
      }
      // Suppression du plat
      fetch(`http://localhost:5000/userPreferences/${user.id}`, {
        method: 'DELETE',
      })
      .then(() => {
        setData(prevData => prevData.filter(item => item.id !== selectedPlat.id));
      });
      closeDeleteModal();
    };

  return (
    <div className="user-containerFaz">
      <h2>Les utilisateurs</h2>
      <p className="detailsUserFaz">Cliquez pour les voir en details</p>

      <div className="filter-sectionFaz">
        <label>
          
          <select value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)}>
            <option value="">Tous les âges</option>
            <option value="18">18 ans</option>
            <option value="25">25 ans</option>
            <option value="30">30 ans</option>
            
          </select>
        </label>
        <label>
         
          <select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
            <option value="">Les deux genres</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
            
          </select>
        </label>
      </div>
      
      {error && <p style={{ color: "red" }}>Erreur : {error}</p>}
      {!usersData.length && <p>Chargement des données...</p>}

      <div className="users-list">
      {filteredUsers.slice(0, visibleCount).map((user, index) => (
          <div
            key={index}
            className="user-card"
            onClick={() => setSelectedUser(user)}
          >
            <FaUserCircle className="UserFazavatar"/>
            <p><strong>{user.age} ans</strong></p>
            <p> {user.Genre}</p>
          </div>
        ))}
      </div>

      {visibleCount < usersData.length && (
        <button className="see-more-btnFaz" onClick={() => setVisibleCount(visibleCount + 10)}>
          Voir plus
        </button>
      )}

      {/* Modale des détails */}
      {selectedUser && (
        <div className="modal-overlayUser" onClick={() => setSelectedUser(null)}>
          <div className="modal-contentUser" onClick={(e) => e.stopPropagation()}>
            
            <button className="close-btnUserFaz" onClick={() => setSelectedUser(null)}>×</button>
            <br/>
            <br/>
            
            <h2>Détails de l'utilisateur</h2>
            <p><strong>Âge:</strong> {selectedUser.age}</p>
            <p><strong>Genre:</strong> {selectedUser.Genre}</p>
            <p><strong>Nationalité:</strong> {selectedUser.Nationalite}</p>
            <p><strong>Région:</strong> {selectedUser.Region}</p>
            <p><strong>Poids:</strong> {selectedUser.Poids} kg</p>
            <p><strong>Taille:</strong> {selectedUser.Taille} cm</p>
            <p><strong>Statut:</strong> {selectedUser.Statut}</p>
            <p><strong>Plat préféré:</strong> {selectedUser.Plat_prefere}</p>
            <p><strong>Plat consommé:</strong> {selectedUser.Plat_consome}</p>
            <p><strong>Aime la cuisine marocaine:</strong> {selectedUser.Aimer_plat_marocain ? "Oui" : "Non"}</p>
            <p><strong>Type de cuisine préféré:</strong> {selectedUser.type_cuisine}</p>
            <p><strong>Allergies:</strong> {selectedUser.Allergies}</p>
            <p><strong>Spécification d'allergie:</strong> {selectedUser.Allergie_specification}</p>
            <p><strong>Végétarien:</strong> {selectedUser.Vegeterien_question ? "Oui" : "Non"}</p>
            <p><strong>Type de viande préféré:</strong> {selectedUser.type_viande_prefere}</p>
            <p><strong>Poids etat:</strong> {selectedUser.Poids_etat}</p>
            <p><strong>Durée de préparation:</strong> {selectedUser.duree_preparation}</p>
            <p><strong>Sport:</strong> {selectedUser.Sport_question ? "Oui" : "Non"}</p>
            <p><strong>Sport pratiqué:</strong> {selectedUser.sport_pratique}</p>
            <p><strong>Régime:</strong> {selectedUser.regime_question ? "Oui" : "Non"}</p>
            <p><strong>Régime alimentaire:</strong> {selectedUser.regime_alimentaire}</p>
            <p><strong>Raison du régime:</strong> {selectedUser.regime_raison}</p>
            <p><strong>Maladie:</strong> {selectedUser.maladie}</p>

            <button className="delete-btnUserFaz" onclick={handleDelete}><FaRegTrashAlt />Supprimer l'utilisateur</button>
         

          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
