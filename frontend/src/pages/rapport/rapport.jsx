import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/navbar/navbar';
import SideBar from '../../components/sidebar/sidebar';
import './rapport.css'
import { fetchDataAllPlat } from '../../../api/plat_data'; 

const Rapport = () => {
    const location = useLocation();
    const { selectedDishes, ...existingState } = location.state || {};
    
    const [data, setData] = useState([]); 

    
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

    console.log(selectedDishes)
    return (
        <div>
            <NavBar/>
            <SideBar/>
            <div className='rapport'>
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
        </div>
    );
};

export default Rapport;