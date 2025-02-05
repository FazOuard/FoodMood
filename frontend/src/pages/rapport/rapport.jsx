import React, { useState, useEffect , useRef} from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/navbar/navbar';
import SideBar from '../../components/sidebar/sidebar';
import './rapport.css'
import { fetchDataAllPlat, fetchIngGroupPlat } from '../../../api/plat_data'; 
import replace2 from "../../assets/replace/replace2.png"
import exportToPDF from '../../fonctions/exportPDF';
import pdficon from "../../assets/icons/pdf.png"
import useCalculateSum from '../../fonctions/CalcSum';
import proteines2 from '../../assets/icons/rapport/proteines.png'
import glucides2 from '../../assets/icons/rapport/glucides.png'
import calories2 from '../../assets/icons/rapport/calories.png'
import lipides2 from '../../assets/icons/rapport/lipides.png'
import NbrPerson2 from '../../components/nbrPerson2/nbrPerson2';

const Rapport = () => {
    const location = useLocation();
    const state = location.state || {};
    const iduser = state?.iduser || 327;
    const { selectedDishes, ...existingState } = location.state || {};
    
    const [data, setData] = useState([]); 
    const [ingData, setIngData] = useState([]); 

    const [nbrpersons, setNbrpersons] = useState({});


    const prevNombresPersonnes2 = useRef();

    // kaninitialisiw nbr persons b 1 1 1 1...
    useEffect(() => {
        if (selectedDishes) {
            const initialNbrpersons = {};
            Object.entries(selectedDishes).forEach(([day, dishSet]) => {
                Array.from(dishSet).forEach((dishId) => {
                    initialNbrpersons[`${day}-${dishId}`] = 1;
                });
            });
            setNbrpersons(initialNbrpersons);
        }
    }, [selectedDishes]);

    // hadi dyal ch7al dnas lkula plat
    const handleCountChange = (day, dishId, newCount) => {
        setNbrpersons((prevNbrpersons) => ({
            ...prevNbrpersons,
            [`${day}-${dishId}`]: newCount, 
        }));
    };
    
    // hadi bach na5ed ghir l id mn selected dishes
    const extractDishIds = (selectedDishes) => {
        const dishIds = [];
        Object.values(selectedDishes || {}).forEach((dishes) => {
          dishes.forEach((dishId) => {
            dishIds.push(dishId);
          });
        });
        return dishIds; 
      };
    

    // important
    const dishIds = extractDishIds(selectedDishes).map(Number); 
    
    // hadi 3la 9bel lformat
    const formatNbrPersons = (dishIds, nbrpersons) => {
        return dishIds.map((dishId) => {
            const key = Object.keys(nbrpersons).find((key) => key.endsWith(`-${dishId}`));
            return key ? nbrpersons[key] : 1; 
        });
    };

    const nombresPersonnes2 = formatNbrPersons(dishIds, nbrpersons);

    // hadi bach njib ga3 les plats
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

    // hadi bach njib les ingredients dyal ga3 les plats li t5taru
    useEffect(() => {
        // const getIngData = async () => {
        //   try {
        //     const dishIds = extractDishIds(selectedDishes); 
        //     const ingData = await fetchIngGroupPlat(dishIds, nombresPersonnes2); 
            
        //     setIngData(ingData); 
        //   } catch (error) {
        //     console.error('Error in fetching data:', error);
        //   }
        // };
    
        // getIngData();
        
        if (JSON.stringify(prevNombresPersonnes2.current) !== JSON.stringify(nombresPersonnes2)) {
            const fetchData = async () => {
              try {
                const dishIds = extractDishIds(selectedDishes);
                const ingData = await fetchIngGroupPlat(dishIds, nombresPersonnes2);
                setIngData(ingData); 
              } catch (error) {
                console.error('Error fetching ingredients:', error);
              }
            };
            fetchData();
            prevNombresPersonnes2.current = nombresPersonnes2; 
          }
      }, [nombresPersonnes2]);

    // hadi bach n7sseb le prix total
    const calculateTotals = (ingData) => {
        const totals = ingData.reduce(
        (acc, item) => {
            acc.totalQuantity += item.QuantityNeeded;
    
            acc.totalPrice += item.TotalPriceForQuantity;
    
            return acc;
        },
        { totalQuantity: 0, totalPrice: 0 } 
        );
    
        return totals;
    };
    
    const { totalQuantity, totalPrice } = calculateTotals(ingData);

    // hadi bach n7sseb la somme dyal proteines, glucides, ...
    
    const { proteines, lipides, calories, glucides } = useCalculateSum(dishIds);
   
    // hadi dyal export to pdf
    const handleExportPDF = () => {
        exportToPDF(ingData);
      };

    console.log(ingData)
    console.log("this iss nbr persons: ",nbrpersons)

    console.log("this is nbr afteeeer", nombresPersonnes2); 

    return (
        <div>
            <NavBar/>
            <SideBar/>
            <div className='rapport'>
                <div className='rapport-part1'>
                    {Object.entries(selectedDishes).map(([day, item]) => (
                        <div key={day} className='rapport-day'>
                            <div className='rotate-rapport'>
                                <h2>{day}</h2>
                                <div className='rapport-horizontal-line2'/>
                            </div>
                            <div className='rapport-dish-oneday'>
                                {item.map((dish, index) => (
                                    <div key={index}>
                                        {data.filter((dish1) => dish1.id == dish)
                                            .map((dish2, index1) => (
                                                <div key={index1} className='rapport-onedish'>
                                                    <h6>{dish2.Titre}</h6>
                                                    <div className='linear-background-rapport'/>
                                                    <img src={dish2.Image} />
                                                </div>
                                            ))}
                                        <NbrPerson2
                                            value={nbrpersons[`${day}-${dish}`] || 1} 
                                            onChange={(newCount) => handleCountChange(day, dish, newCount)}
                                        />
                                    </div>
                                ))}
                                {Array.from({ length: 4 - item.length }).map((_, i) =>(
                                    <div className='rapport-onedish'>
                                        <img src={replace2}/>
                                    </div>
                                )) }
                            </div>
                        </div>
                    ))}

                    <div className='rapport-stats'>
                        <h3>Pour une seule personne avec ces plats vous allez avoir</h3>
                        <div className='stats-vert-line'/>
                        <div className='stats-hor-line'/>
                        <div className='rapport-stats-all'>
                        <div className='rapport-stat-one'>
                            <img src={proteines2} />
                            <div className='rapport-stat-one-text'>
                                <div className='rapport-stat-one-text-details'>
                                    <h2>{proteines}<div className='rapport-stat-one-text-details2'> g</div></h2>
                                    
                                </div>
                                <div className='rapport-stat-one-text-details3'>
                                <h5>Proteins</h5></div>
                            </div>
                        </div>
                        <div className='rapport-stat-one'>
                            <img src={lipides2} />
                            <div className='rapport-stat-one-text'>
                                <div className='rapport-stat-one-text-details'>
                                    <h2>{lipides}<div className='rapport-stat-one-text-details2'> g</div></h2>
                                    
                                </div>
                                <h5>Lipides</h5>
                            </div>
                        </div>
                        <div className='rapport-stat-one'>
                            <img src={calories2} />
                            <div className='rapport-stat-one-text'>
                                <div className='rapport-stat-one-text-details'>
                                    <h2>{calories}<div className='rapport-stat-one-text-details2'> Kcal</div></h2>
                                    
                                </div>
                                <h5>Calories</h5>
                            </div>
                        </div>
                        <div className='rapport-stat-one'>
                            <img src={glucides2} />
                            <div className='rapport-stat-one-text'>
                                <div className='rapport-stat-one-text-details'>
                                    <h2>{glucides}<div className='rapport-stat-one-text-details2'> g</div></h2>
                                    
                                </div>
                                <h5>Glucides</h5>
                            </div>
                        </div>
                    </div></div>

                </div>
                <div className='rapport-part2'>
                    <h3>Ingrédients</h3>
                    <div className='rapport-horizontal-line'/>
                    <div className='rapport-ing-info-all'>
                        <div className='rapport-ing-info'>
                        {ingData.map((ing, index_ing1) => (
                            <div key={index_ing1}>
                                {ing.IngredientName}
                            </div>
                        ))}
                        </div>
                        <div className='rapport-vertical-line'/>
                        <div className='rapport-ing-info3'>
                        {ingData.map((ing, index_ing2) => (
                            <div key={index_ing2}>
                                {ing.QuantityNeeded} <div className='mad'>{ing.Unit}</div>
                            </div>
                        ))}
                        
                        </div>
                        
                        <div className='rapport-vertical-line'/>
                        <div className='rapport-ing-info2'>
                        {ingData.map((ing, index_ing3) => (
                            <div key={index_ing3} >
                                {ing.TotalPriceForQuantity.toFixed(2)} <div className='mad'>MAD</div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>

                <div className='rapport-part3'>
                    <h2>Total: {totalPrice.toFixed(2)} MAD</h2>
                    
                <div className='export-pdf-rapport' onClick={handleExportPDF}>
                    <img src={pdficon} />
                </div>
                </div>
            </div>
        </div>
    );
};

export default Rapport;