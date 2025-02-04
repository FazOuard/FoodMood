import React, { useEffect, useState } from 'react';
import './moroccomap.css'
import { MoroccoData } from '../../../api/moroccoData';
import { processPreferredDishes } from '../../../api/userPreferencesData';

const MoroccoMap = ({onClose}) => {
    const [ regionMorocco, setregionMorocco ] = useState("Casablanca-Settat")
    const [ regionDishes, setRegionDishes ] = useState()

    useEffect(() => {
            const getData = async () => {
              try {
                const data = await processPreferredDishes(regionMorocco); 
                setRegionDishes(data); 
              } catch (error) {
                console.error('Error in fetching data:', error);
              }
            };
        
            getData();
        }, [regionMorocco]);

    return (
        <div className='worldmap-all' onClick={onClose}>
            <div className='worldmap-main' style={{ height: "80%", position: "relative"}} onClick={(e) => e.stopPropagation()}>
                <div className='worldmap-1'>
                    <h2>La carte du Maroc</h2>
                    <img style={{ paddingBottom: "20px"}} src={MoroccoData.find((item) => item.name === regionMorocco).img}/>
                    <div className='MOROCCO-legend'>
                        <div className='worldmap-legend1' style={{ color: "#2B4C18" }} onClick={() => setregionMorocco("Tanger-Tétouan-Al Hoceima")}>
                            <div className='world-map-circle' style={{ backgroundColor: "#2B4C18"}}/>
                            Tanger-Tétouan-Al Hoceima
                        </div>
                        <div className='worldmap-legend1' style={{ color: "#2B4C18" }} onClick={() => setregionMorocco("Souss-Massa")}>
                            <div className='world-map-circle' style={{ backgroundColor: "#2B4C18"}}/>
                            Souss-Massa
                        </div>
                        <div className='worldmap-legend1' style={{ color: "#2B4C18" }} onClick={() => setregionMorocco("Rabat-Salé-Kenitra")}>
                            <div className='world-map-circle' style={{ backgroundColor: "#2B4C18"}}/>
                            Rabat-Salé-Kenitra
                        </div>
                        <div className='worldmap-legend1' style={{ color: "#2B4C18" }} onClick={() => setregionMorocco("Béni Mellal-Khénifra")}>
                            <div className='world-map-circle' style={{ backgroundColor: "#2B4C18"}}/>
                            Béni Mellal-Khénifra
                        </div>
                        <div className='worldmap-legend1' style={{ color: "#2B4C18" }} onClick={() => setregionMorocco("Oriental")}>
                            <div className='world-map-circle' style={{ backgroundColor: "#2B4C18"}}/>
                            Oriental
                        </div>
                        <div className='worldmap-legend1' style={{ color: "#2B4C18" }} onClick={() => setregionMorocco("Marrakech-Safi")}>
                            <div className='world-map-circle' style={{ backgroundColor: "#2B4C18"}}/>
                            Marrakech-Safi
                        </div>
                    </div>
                    <div className='MOROCCO-legend2'>
                        <div className='worldmap-legend1' style={{ color: "#2B4C18" }} onClick={() => setregionMorocco("Laayoune-Sakia el Hamra")}>
                            <div className='world-map-circle' style={{ backgroundColor: "#2B4C18"}}/>
                            Laayoune-Sakia el Hamra
                        </div>
                        <div className='worldmap-legend1' style={{ color: "#2B4C18" }} onClick={() => setregionMorocco("Guelmim-Oued Noun")}>
                            <div className='world-map-circle' style={{ backgroundColor: "#2B4C18"}}/>
                            Guelmim-Oued Noun
                        </div>
                        <div className='worldmap-legend1' style={{ color: "#2B4C18" }} onClick={() => setregionMorocco("Fès-Meknès")}>
                            <div className='world-map-circle' style={{ backgroundColor: "#2B4C18"}}/>
                            Fès-Meknès
                        </div>
                        <div className='worldmap-legend1' style={{ color: "#2B4C18" }} onClick={() => setregionMorocco("Deraa-Tafilalet")}>
                            <div className='world-map-circle' style={{ backgroundColor: "#2B4C18"}}/>
                            Deraa-Tafilalet
                        </div>
                        <div className='worldmap-legend1' style={{ color: "#2B4C18" }} onClick={() => setregionMorocco("Dakhla-Oued ed Dahab")}>
                            <div className='world-map-circle' style={{ backgroundColor: "#2B4C18"}}/>
                            Dakhla-Oued ed Dahab
                        </div>
                        <div className='worldmap-legend1' style={{ color: "#2B4C18" }} onClick={() => setregionMorocco("Casablanca-Settat")}>
                            <div className='world-map-circle' style={{ backgroundColor: "#2B4C18"}}/>
                            Casablanca-Settat
                        </div>
                    </div>
                </div>
                <div className='worldmap-2'>
                    <h2>Les plats préférés de la région {regionMorocco}</h2>
                    <div className='worldmap-2-1'>
                        {regionDishes?.map((dishcon, indexcon) => (
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
                        {regionDishes?.map((dishcon, indexcon1) => (
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

export default MoroccoMap;
