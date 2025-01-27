import React, { useEffect, useState } from "react";
import "./plat.css";
import { useLocation } from "react-router-dom";
import clock from "../../assets/icons/clock.png";
import calorie from "../../assets/icons/calorie.png";
import proteine from "../../assets/icons/proteine.png";
import like0 from "../../assets/icons/like0.png";
import like1 from "../../assets/icons/like1.png";
import { fetchDataAllPlat } from "../../../api/plat_data";
import { addToFavorites, deleteFromFavorites } from "../../../api/favorites";

const Plat = () => {
  const [liked, setLiked] = useState(false);
  const [data, setData] = useState([]);
  const location = useLocation();
  const state = location.state || {};
  const userId = 1;

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchDataAllPlat();
        setData(data);

        // Vérifier si le plat est déjà un favori
        const currentPlat = data.find((item) => item.id == state.idplat);
        if (currentPlat) {
          const response = await fetch(`http://localhost:8081/toutHistorique/${userId}`);
          const historique = await response.json();
          const isFavori = historique.some((fav) => fav.plat === currentPlat.Titre);
          setLiked(isFavori);
        }
      } catch (error) {
        console.error("Erreur dans la récupération des données :", error);
      }
    };

    getData();
  }, [state.idplat]);

  const handleLikeClick = async () => {
    const plat = data.find((item) => item.id == state.idplat);
    if (!plat) {
      console.error("Plat non trouvé !");
      return;
    }

    if (liked) {
      // Supprimer des favoris
      try {
        await deleteFromFavorites(userId, plat.Titre);
        console.log("Plat supprimé des favoris.");
        setLiked(false);
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    } else {
      // Ajouter aux favoris
      try {
        await addToFavorites(userId, plat.Titre);
        console.log("Plat ajouté aux favoris.");
        setLiked(true);
      } catch (error) {
        console.error("Erreur lors de l'ajout :", error);
      }
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
                <img src={item.Image} />
              </div>
              <div className="plat-fixback" />
              <div className="plat-infos">
                <div className="plat-title-like">
                  <div className="plat-title">
                    <h1>{item.Titre}</h1>
                  </div>
                  <div className="plat-like" onClick={handleLikeClick}>
                    <img src={liked ? like1 : like0} alt="Like button" />
                  </div>
                </div>
                <div className="plat-ingredient">
                  <h2>Ingrédients</h2>
                  <h5>
                    {item.Ingredients || (
                      <div style={{ color: "#CECECE" }}>
                        Nous allons essayer de définir les ingrédients le plus tôt possible!
                      </div>
                    )}
                  </h5>
                </div>
                <div className="plat-info">
                  <div className="plat-duree">
                    <img src={clock} />
                    <h5>{item.Duree || "N/A"} mins</h5>
                  </div>
                  <div className="line" />
                  <div className="plat-duree">
                    <img src={calorie} />
                    <h5>{item.Calories || "N/A"} Kcal</h5>
                  </div>
                  <div className="line" />
                  <div className="plat-duree">
                    <img src={proteine} />
                    <h5>{item.Proteines || "N/A"} grammes</h5>
                  </div>
                </div>
                <div className="plat-recette">
                  <h2>Recette</h2>
                  <h5>
                    {item.Recette || (
                      <div style={{ color: "#CECECE" }}>
                        Nous allons essayer de définir la recette le plus tôt possible!
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
