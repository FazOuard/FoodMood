import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './plat.css'
import { useLocation } from 'react-router-dom';
import clock from '../../assets/icons/clock.png'
import calorie from '../../assets/icons/calorie.png'
import proteine from '../../assets/icons/proteine.png'
import like0 from '../../assets/icons/like0.png'
import like1 from '../../assets/icons/like1.png'

const Plat = () => {
    
    const [data, setData] = useState([]);

    const location = useLocation();
    const state = location.state || {};

    useEffect(() => {
        axios.get('http://localhost:5000/data')
          .then(response => {
            setData(response.data);
            console.log(response.data);
          })
          .catch(error => console.error('Error fetching data:', error));
      }, []);
    
    return (
        <div>
            <div className='plat-all'>
            {data
            .filter((item) => item.id == state.idplat)
            .map((item, index) => (
                <div key={index} className='plat'>
                    <div className='plat-image'>
                        <img src={item.Image} />
                    </div>
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
