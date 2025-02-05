import React, { useEffect, useState } from 'react'; 
import './recommend.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Recomm from "../../assets/replace/Recomm.png"

const Recommend = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [allPlats, setAllPlats] = useState([]); // Etat pour les plats récupérés via fetchDataAllPlat
    const navigate = useNavigate();
    const location = useLocation();
  
  const state = location.state || {};
  const userId =  state?.iduser || 1;
    const goToOneDish = (idplat) => {
        navigate("/platinfo", {state: { ...(location.state || {}), idplat } })
    }

    const fetchFoodItems = async () => {
        try {
            const response = await fetch('http://localhost:8081/recommend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: userId }), 
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
            }

            const data = await response.json();
            setFoodItems(data); // Stocke les données dans l'état
        } catch (error) {
            console.error('Erreur de récupération des données:', error);
        }
    };

    // Fonction pour récupérer tous les plats (id et titre) à partir de l'API
    const fetchDataAllPlat = async () => {
        try {
            const response = await fetch('http://localhost:5000/data'); // Remplace l'URL avec la bonne
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des plats');
            }
            const data = await response.json();
            setAllPlats(data); // Stocke les données dans l'état
        } catch (error) {
            console.error('Erreur de récupération des plats:', error);
        }
    };

    useEffect(() => {
        fetchFoodItems(); // Récupère les plats recommandés
        fetchDataAllPlat(); // Récupère tous les plats avec leurs ids
    }, []);

    // Fonction pour trouver l'id du plat basé sur son titre
    const findPlatIdByTitle = (title) => {
        const plat = allPlats.find(plat => plat.Titre === title);
        return plat ? plat.id : null; // Renvoie l'id ou null si pas trouvé
    };

    return (
        <div className="containerofallandnothing">
            <h1>Plats que vous pourrez aimer</h1>
            <div className='plats0'>
                <div className='plats00'>
                {foodItems.length > 0 ?
                    foodItems
                    .filter((item) => item.Image != null) // Filtre les plats pour ne garder que ceux qui ont une image
                    .map((item, index) => ( // Pour chaque plat filtré, crée un nouveau <div>
                        <div key={index} className='un_plat' onClick={() => {
                            const idplat = findPlatIdByTitle(item.Titre); // Trouve l'id du plat en fonction du titre
                            if (idplat) {
                                goToOneDish(idplat);
                            }
                        }}>
                            {item.Image ? (
                                <div className='plats_img'>
                                    <img src={item.Image} alt={item.Titre} />
                                    <div className='shadow'></div>
                                    <h2>{item.Titre}</h2>
                                </div>
                            ) : null}
                        </div>
                    ))
                :
                <div className='un_plat'>
                        <div className='plats_img'>
                            <img src={Recomm} />
                        </div>
                </div>
                }
            </div>
            </div>
        </div>
    );
};

export default Recommend;
