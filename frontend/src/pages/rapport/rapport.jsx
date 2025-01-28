import React, { useState, useEffect } from 'react';
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

const Rapport = () => {
    const location = useLocation();
    const { selectedDishes, ...existingState } = location.state || {};
    
    const [data, setData] = useState([]); 
    const [ingData, setIngData] = useState([]); 

    const extractDishIds = (selectedDishes) => {
        const dishIds = [];
        Object.values(selectedDishes || {}).forEach((dishes) => {
          dishes.forEach((dishId) => {
            dishIds.push(dishId);
          });
        });
        return dishIds; 
      };
    
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

    useEffect(() => {
        const getIngData = async () => {
          try {
            const dishIds = extractDishIds(selectedDishes); 
            const ingData = await fetchIngGroupPlat(dishIds); 
            
            setIngData(ingData); 
          } catch (error) {
            console.error('Error in fetching data:', error);
          }
        };
    
        getIngData();
      }, []);

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
    
    const dishIds = extractDishIds(selectedDishes).map(Number); 
    const { totalQuantity, totalPrice } = calculateTotals(ingData);
    
    const { proteines, lipides, calories, glucides } = useCalculateSum(dishIds);
   
    const handleExportPDF = () => {
        exportToPDF(ingData);
      };

    console.log(ingData)

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