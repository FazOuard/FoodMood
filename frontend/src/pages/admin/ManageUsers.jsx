import React, { useState, useEffect } from "react";
import { FaCheck, FaTimes, FaUserCircle } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import "./ManageUsers.css";
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GiWeight, GiWeightLiftingUp } from "react-icons/gi";
import { MdOutlineHomeWork } from "react-icons/md";
import { IoIosMale , IoMdFemale} from "react-icons/io";

const ManageUsers = () => {
  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [visibleCount, setVisibleCount] = useState(10); // Nombre max affiché
  const [ageFilter, setAgeFilter] = useState(""); // Filtre par âge
  const [genreFilter, setGenreFilter] = useState(""); // Filtre par genre
  const [searchTerm, setSearchTerm] = useState("");  // Ajoute ceci pour gérer l'état de la recherche

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/userWithPreferences");
        const data = await response.json();
        setUsersData(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);


    const filteredUsers = usersData
    .filter((user) => {
      if (ageFilter) {
        return user.age[0] === parseInt(ageFilter, 10);  // Filtre par âge
      }
      return true;
    })
    .filter((user) => {
      if (genreFilter) {
        return user.Genre === genreFilter; // Filtre par genre
      }
      return true;
    })
    .filter((user) => {
      if (searchTerm) {
        return user.Plat_prefere.toLowerCase().includes(searchTerm.toLowerCase()); // Filtre par recherche
      }
      return true;
    });


    const handleDelete = () => {
      if (!selectedPlat) {
        console.error("Aucun plat sélectionné pour suppression.");
        return;
      }
      // Suppression du plat
      fetch(`http://localhost:5000/userWithPreferences/${user.id}`, {
        method: 'DELETE',
      })
      .then(() => {
        setData(prevData => prevData.filter(item => item.id !== selectedPlat.id));
      });
      closeDeleteModal();
    };

  return (
    <div className="user-containerFaz">
     
      <div className='rechercheTotalFaz'>
                  <label className='searchPlatFaz'><FaSearch /></label>
                  <input
                    type="text"
                    placeholder="Rechercher un utilisateur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded"
                  />
                </div>
      <div className="filter-sectionFaz">
        <label>
          
          <select value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)}>
            <option value="">Ages</option>
            <option value="18">18 ans</option>
            <option value="25">25 ans</option>
            <option value="30">30 ans</option>
            
          </select>
        </label>
        <label>
         
          <select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
            <option value="">Genres</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
            
          </select>
        </label>
      </div>
      
      {error && <p style={{ color: "red" }}>Erreur : {error}</p>}
      {!usersData.length && <p>Chargement des données...</p>}

      <div className="users-listFaz">
      
      {filteredUsers.slice(0, visibleCount).map((user) => (

          <div key={user.id} className="user-cardFaz" onClick={() => setSelectedUser(user)}>
            <button className="delete-btnUserFaz" onclick={handleDelete}><FaRegTrashAlt /></button>

            <FaUserCircle className="UserFazavatar"/>
            <p className="usernameFaz"><strong>{user.username} </strong>
            {user.Genre=== "Femme" ? (
                <>
                  <IoMdFemale /> 
                </>
              ) : (
                <>
                  <IoIosMale />
                </>
              )}</p>
            <div className="NationaliteRegion">
              <p> <FaLocationDot />{user.Nationalite}</p>
              <p> {user.Region}</p>
            </div>
            
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
            <div className="avataremail">
            <FaUserCircle className="UserFazavatar"/>
            
            <div className="agegenreusername">
              <p><strong>{selectedUser.username}</strong></p>
              <div className="agegenre2">
                <p> {selectedUser.age[0]} ans</p>
                <p>{selectedUser.Genre}</p>
              </div>

            </div>
            </div>
            <div className="poidtaillestatut">
              <p> <GiWeight />{selectedUser.Poids} kg</p>
              <p><GiWeightLiftingUp />{selectedUser.Taille} cm</p>
              <p><MdOutlineHomeWork />{selectedUser.Statut}</p>
              <p><FaLocationDot/> {selectedUser.Nationalite}/ {selectedUser.Region}</p>
            </div>
            
            <p><strong>Préférences:</strong></p>
            <div className="preferenceUserFaz">
              <p><strong>Plat préféré:</strong> {selectedUser.Plat_prefere}</p>
              <p><strong>Type de cuisine préféré:</strong> {selectedUser.type_cuisine}</p>
              <p><strong>Aime la cuisine marocaine:</strong> {selectedUser.Aimer_plat_marocain ? "Oui" : "Non"}</p>
              <p><strong>Type de viande préféré:</strong> {selectedUser.type_viande_prefere}</p>
              <p><strong>Poids etat:</strong> {selectedUser.Poids_etat}</p>
              <p><strong>Durée de préparation:</strong> {selectedUser.duree_preparation}</p>
              <p><strong>Plat consommé:</strong> {selectedUser.Plat_consome}</p>

            </div>
            <p><strong>Détails sur l'utilisateur</strong></p>
            <div className="ouiOuNon">
              <p><strong>Allergies:</strong> {selectedUser.Allergies === "Oui" ? (
                <>
                  <FaCheck /> 
                </>
              ) : (
                <>
                  <FaTimes  /> 
                </>
              )}</p>
              <p><strong>Végétarien:</strong> {selectedUser.Vegeterien_question  === "Oui" ? (
                <>
                  <FaCheck  /> 
                </>
              ) : (
                <>
                  <FaTimes  /> 
                </>
              )}</p>
              <p><strong>Sport:</strong> {selectedUser.Sport_question  === "Oui" ? (
                <>
                  <FaCheck  /> 
                </>
              ) : (
                <>
                  <FaTimes  /> 
                </>
              )}</p>
              <p><strong>Régime:</strong> {selectedUser.regime_question  === "Oui" ? (
                <>
                  <FaCheck  /> 
                </>
              ) : (
                <>
                  <FaTimes  /> 
                </>
              )}</p>
              
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
