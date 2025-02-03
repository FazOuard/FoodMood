import React, { useEffect, useState } from 'react';
import './worldmap.css'
import { worldData } from '../../../api/worldMapData';
import { processContinentDishes } from '../../../api/userPreferencesData';

const WorldMap = () => {
    const [ continent, setContinent ] = useState("Afrique")
    const [ continentDishes, setContinentDishes ] = useState()

    useEffect(() => {
            const getData = async () => {
              try {
                const data = await processContinentDishes(continent); 
                setContinentDishes(data); 
              } catch (error) {
                console.error('Error in fetching data:', error);
              }
            };
        
            getData();
        }, [continent]);


    console.log("this is continentDishes : ", continentDishes)
    return (
        <div className='worldmap-all'>
            <div className='worldmap-main'>
                <div className='worldmap-1'>
                    <h2>La carte du monde</h2>
                    <img src={worldData.find((item) => item.name === continent).img}/>
                    <div className='worldmap-legend'>
                        <div className='worldmap-legend1' style={{ color: "#2B4C18" }} onClick={() => setContinent("Afrique")}>
                            <div className='world-map-circle' style={{ backgroundColor: "#2B4C18"}}/>
                            Afrique
                        </div>
                        <div className='worldmap-legend1' style={{ color: "#D1EB0C" }} onClick={() => setContinent("Amérique du Nord")}>
                            <div className='world-map-circle' style={{ backgroundColor: "#D1EB0C"}}/>
                            Amérique du nord
                        </div>
                        <div className='worldmap-legend1' style={{ color: "#A6FF00" }} onClick={() => setContinent("Asie")}>
                            <div className='world-map-circle' style={{ backgroundColor: "#A6FF00"}}/>
                            Asie
                        </div>
                        <div className='worldmap-legend1' style={{ color: "#6E9955" }} onClick={() => setContinent("Europe")}>
                            <div className='world-map-circle' style={{ backgroundColor: "#6E9955"}}/>
                            Europe
                        </div>
                        
                        <div className='worldmap-legend1' style={{ color: "#4F6623" }} onClick={() => setContinent("Amérique du Sud")}>
                            <div className='world-map-circle' style={{ backgroundColor: "#4F6623"}}/>
                            Amérique du sud
                        </div>

                        <div className='worldmap-legend1' style={{ color: "#EEFF81" }} onClick={() => setContinent("Australie")}>
                            <div className='world-map-circle' style={{ backgroundColor: "#EEFF81"}}/>
                            Australie
                        </div>
                    </div>
                </div>
                <div className='worldmap-2'>
                    <h2>Les plats préférés de l'{continent}</h2>
                    <div className='worldmap-2-1'>
                        {continentDishes?.map((dishcon, indexcon) => (
                            indexcon === 0 ?
                                <div className='worldmap-2-1-nbr1'>
                                    <div className='worldmap-2-1-nbr1-img'>
                                        <h1>#1</h1>
                                        <div className='img-worldmap-first'>
                                            <img src={dishcon.image}/>
                                        </div>
                                    </div>
                                    <h2>{dishcon.dish.charAt(0).toUpperCase() + dishcon.dish.slice(1)}</h2>
                                </div>
                            :
                                null
                        ))}
                        <div className='worldmap-2-1-nbr2-all'>
                        {continentDishes?.map((dishcon, indexcon1) => (
                                indexcon1 === 1 || indexcon1 === 2 || indexcon1 === 3 ?
                                
                                    <div className='worldmap-2-1-nbr2'>
                                        <div className='worldmap-2-1-nbr2-img'>
                                            <h4>#{indexcon1 + 1}</h4>
                                            <div className='img-worldmap'>
                                                <img src={dishcon.image}/>
                                            </div>
                                        </div>
                                        <h4>{dishcon.dish.charAt(0).toUpperCase() + dishcon.dish.slice(1)}</h4>
                                    </div>
                                
                                :
                                null
                        ))}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorldMap;
