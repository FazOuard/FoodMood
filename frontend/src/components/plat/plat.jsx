import React, { useEffect, useState } from 'react';
import './plat.css';
import { useLocation } from 'react-router-dom';
import clock from '../../assets/icons/clock.png';
import calorie from '../../assets/icons/calorie.png';
import proteine from '../../assets/icons/proteine.png';
import like0 from '../../assets/icons/like0.png';
import like1 from '../../assets/icons/like1.png';
import { fetchDataAllPlat } from '../../../api/plat_data'; 
import { addToFavorites, deleteInteraction } from '../../../api/favorites';

const Plat = () => {
  const [data, setData] = useState([]);
  const [likedPlats, setLikedPlats] = useState({});
  const userId = 1;

  const location = useLocation();
  const state = location.state || {};

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchDataAllPlat();
        setData(data);

        // Vérifier si le plat est déjà dans l'historique
        const plat = data.find((item) => item.id == state.idplat);
        if (plat) {
          const response = await fetch(`http://localhost:8081/toutHistorique/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: userId, plat: plat.Titre }),
          });
          const result = await response.json();
          setLikedPlats((prev) => ({ ...prev, [plat.id]: result.exists })); // `result.exists` doit être un booléen (true si dans l'historique)

        }
      } catch (error) {
        console.error('Error in fetching data:', error);
      }
    };

    getData();
  }, [state.idplat]);

  const handleLikeClick = async (platId) => {
    const plat = data.find((item) => item.id == platId);
    if (!plat) {
      console.error('Plat non trouvé !');
      return;
    }

    try {
      if (likedPlats[platId]) {
        // Supprimer du historique
        await deleteInteraction(userId, plat.Titre);
        console.log(`Plat supprimé du historique: ${plat.Titre}`);
      } else {
        // Ajouter au historique
        await addToFavorites(userId, plat.Titre);
        console.log(`Plat ajouté au historique: ${plat.Titre}`);
      }
      setLikedPlats((prev) => ({ ...prev, [platId]: !prev[platId] })); // Inverser l'état du bouton like
    } catch (error) {
      console.error('Erreur lors du traitement du clic sur le bouton like:', error);
    }
  };

  return (
    <div>
      <div className="plat-all">
        {data
          .filter((item) => item.id == state.idplat)
          .map((item, index) => (
            <div key={index} className="plat">
              <div className="plat-image">
                <img src={item.Image} alt={item.Titre} />
              </div>
              <div className="plat-fixback" />
              <div className="plat-infos">
                <div className="plat-title-like">
                  <div className="plat-title">
                    <h1>{item.Titre}</h1>
                  </div>
                  <div className="plat-like" onClick={() => handleLikeClick(item.id)}>
                    <img src={likedPlats[item.id] ? like1 : like0} alt="Like button" />
                  </div>
                </div>
                <div className="plat-ingredient">
                  <h2>Ingrédients</h2>
                  <h5>
                    {item.Ingredients ? (
                      item.Ingredients
                    ) : (
                      <div style={{ color: '#CECECE' }}>
                        Nous allons essayer de définir les ingrédients le plutôt possible!
                      </div>
                    )}
                  </h5>
                </div>

                <div className="plat-info">
                  <div className="plat-duree">
                    <img src={clock} alt="clock" />
                    <h5>{item.Duree ? item.Duree : 'NaaaN mins'}</h5>
                  </div>
                  <div className="line" />
                  <div className="plat-duree">
                    <img src={calorie} alt="calorie" />
                    <h5>{item.Calories ? item.Calories : 'NaaaN'} Kcal</h5>
                  </div>
                  <div className="line" />
                  <div className="plat-duree">
                    <img src={proteine} alt="proteine" />
                    <h5>{item.Proteines ? item.Proteines : 'NaaaN'} grammes</h5>
                  </div>
                </div>
                <div className="plat-recette">
                  <h2>Recette</h2>
                  <h5>
                    {item.Recette ? (
                      item.Recette
                    ) : (
                      <div style={{ color: '#CECECE' }}>
                        Nous allons essayer de définir la recette le plutôt possible!
                      </div>
                    )}
                  </h5>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Plat;