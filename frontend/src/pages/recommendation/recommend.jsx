import React, { useEffect, useState } from 'react'; // Garde uniquement cette ligne
import './recommend.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Recommend = () => {
    const [foodItems, setFoodItems] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const goToOneDish = (idplat) => {
        navigate("/platinfo", {state: { ...(location.state || {}), idplat } })
    }

    const fetchFoodItems = async () => {
        try {
          const response = await fetch('http://localhost:8080/recommend', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: 1 }), // Envoie l'ID utilisateur dans le corps de la requête
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

    useEffect(() => {
      fetchFoodItems();
    }, []);

    return (
      <div className="containerofallandnothing">
        <h1>Plats que vous pourrez aimer</h1>
        <div className='plats0'>
          {foodItems
            .filter((item) => item.Image != null) // Filtre les plats pour ne garder que ceux qui ont une image
            .map((item, index) => ( // Pour chaque plat filtré, crée un nouveau <div>
              <div key={index} className='un_plat' onClick={() => goToOneDish(item.id)}>
                {item.Image ? (
                  <div className='plats_img'>
                    <img src={item.Image} alt={item.Titre} />
                    <div className='shadow'></div>
                    <h2>{item.Titre}</h2>
                  </div>
                ) : null}
              </div>
            ))}
        </div>
      </div>
    );
};

export default Recommend;
