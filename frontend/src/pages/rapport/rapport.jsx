import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/navbar/navbar';
import SideBar from '../../components/sidebar/sidebar';
import './rapport.css'
import { fetchDataAllPlat, fetchIngGroupPlat } from '../../../api/plat_data'; 

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
      
    const { totalQuantity, totalPrice } = calculateTotals(ingData);

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
                            </div>
                            <div className='rapport-dish-oneday'>
                                {item.map((dish, index) => (
                                    <div key={index}>
                                        {data.filter((dish1) => dish1.id == dish)
                                            .map((dish2, index1) => (
                                                <div key={index1} className='rapport-onedish'>
                                                    <h6>{dish2.Titre}</h6>
                                                    <img src={dish2.Image} />
                                                </div>
                                            ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
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
                        <div className='rapport-ing-info'>
                        {ingData.map((ing, index_ing2) => (
                            <div key={index_ing2}>
                                {ing.QuantityNeeded} {ing.Unit}
                            </div>
                        ))}
                        
                        </div>
                        
                        <div className='rapport-vertical-line'/>
                        <div className='rapport-ing-info2'>
                        {ingData.map((ing, index_ing3) => (
                            <div key={index_ing3} >
                                {ing.TotalPriceForQuantity} MAD
                            </div>
                        ))}
                        </div>
                    </div>
                </div>

                <div className='rapport-part3'>
                    <h2>Total: {totalPrice.toFixed(2)} MAD</h2>
                </div>
            </div>
        </div>
    );
};

export default Rapport;