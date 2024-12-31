import React, { useEffect, useState } from 'react';
import './recommend.css';

const Recommend = () => {
    const [foodItems, setFoodItems] = useState([]);
  
    // Fonction pour récupérer les données
    const fetchFoodItems = async () => {
        try {
          const response = await fetch('http://localhost:5000/recommend', {
            method: 'POST', // Use POST method
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: 1 }), // Send user_id in the request body
          });
      
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
          }
      
          const data = await response.json();
          setFoodItems(data); // Store the data in state
        } catch (error) {
          console.error('Erreur de récupération des données:', error);
        }
      };
      
      
    // Utilisation de useEffect pour récupérer les données à chaque chargement du composant
    useEffect(() => {
      fetchFoodItems();
    }, []);
  
    return (
      <div className="food-list">
        <h1>Liste des Plats</h1>
        <div className="food-items">
          {foodItems.map((item, index) => (
            <div className="food-item" key={index}>
              <img src={item.Image} alt={item.Titre} />
              <h2>{item.Titre}</h2>
            </div>
          ))}
        </div>
      </div>
    );
  };
  

export default Recommend;
