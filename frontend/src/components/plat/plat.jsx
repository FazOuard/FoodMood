/**
 * Objectif général :
Le composant Plat dans votre projet React est conçu pour afficher les détails d'un plat (image, titre, ingrédients, durée, calories, protéines, recette, etc.). 
Il utilise les hooks useState et useEffect pour gérer l'état des données et effectuer des requêtes API. 
Les données sont récupérées depuis un serveur local (localhost:5000/data), 
puis filtrées et affichées en fonction de l'ID du plat passé via useLocation de react-router-dom.
 */



import React, { useEffect, useState } from 'react';//useState permet de stocker les données récupérées   useEffect est utilisé pour effectuer la requête API lorsque le composant est monté
import axios from 'axios'; //Un client HTTP utilisé pour faire des requêtes API.
import './plat.css'
import { useLocation } from 'react-router-dom';
import clock from '../../assets/icons/clock.png'
import calorie from '../../assets/icons/calorie.png'
import proteine from '../../assets/icons/proteine.png'
import like0 from '../../assets/icons/like0.png'
import like1 from '../../assets/icons/like1.png'
import { fetchDataAllPlat } from '../../../api/plat_data'; 

const Plat = () => {
    // Déclaration de l'État
    const [data, setData] = useState([]); //useState([]) : Cela initialise un état local nommé data avec une valeur par défaut d'un tableau vide.
    //  setData est la fonction qui vous permettra de mettre à jour cet état plus tard
     //Récupération de l'Emplacement
    const location = useLocation(); //useLocation() : Ce hook permet d'accéder à l'objet location qui contient des informations sur l'URL actuelle.
    const state = location.state || {}; //Cela récupère l'état passé via le routeur (s'il y en a) ou initialise state comme un objet vide si aucun état n'est présent.

    useEffect(() => {
        const getData = async () => {
          try {
            const data = await fetchDataAllPlat();
            setData(data);
          } catch (error) {
            console.error('Error in fetching data:', error);
          }
        };
    
        getData(); 
      }, []);

    return (
        <div>
            <div className='plat-all'>
            {data
            .filter((item) => item.id == state.idplat)  //Filtre le tableau data pour ne garder que l'élément dont l'ID correspond à state.idplat. Cela signifie que vous affichez uniquement les détails d'un plat spécifique.
            .map((item, index) => (        //Pour chaque élément filtré, vous créez un nouveau <div> contenant les détails du plat.
                <div key={index} className='plat'>
                    <div className='plat-image'>
                        <img src={item.Image} />                      
                    </div>
                    <div className='plat-fixback'/>
                    <div className='plat-infos'>
                        <div className='plat-title-like'>
                            <div className='plat-title'>
                                <h1>{item.Titre}</h1>
                            </div>
                            <div className='plat-like'>
                                <img src={like0} />
                            </div>
                        </div>
                        <div className='plat-ingredient'>
                            <h2>Ingrédients</h2>
                            <h5>{item.Ingredients ? item.Ingredients : <div style={{ color: "#CECECE" }}>Nous allons essayer de définir les ingrédients le plutôt possible!</div>}</h5>
                        </div>

                        <div className='plat-info'>
                            <div className='plat-duree'>
                                <img src={clock} />
                                <h5>{item.Duree ? item.Duree : "NaaaN mins"}</h5>
                            </div>
                            <div className='line' />
                            <div className='plat-duree'>
                                <img src={calorie} />
                                <h5>{item.Calories ? item.Calories : "NaaaN"} Kcal</h5>
                            </div>
                            <div className='line' />
                            <div className='plat-duree'>
                                <img src={proteine} />
                                <h5>{item.Proteines ? item.Proteines : "NaaaN"} grammes</h5>
                            </div>
                        </div>
                        <div className='plat-recette'>
                            <h2>Recette</h2>
                            <h5>{item.Recette ? item.Recette : <div style={{ color: "#CECECE" }}>Nous allons essayer de définir la recette le plutôt possible!</div>}</h5>
                        </div>
                    </div>
                </div>
            ))
            }
            </div>
        </div>
    );
};

export default Plat;
