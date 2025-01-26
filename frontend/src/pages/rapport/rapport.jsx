import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/navbar/navbar';
import SideBar from '../../components/sidebar/sidebar';

const Rapport = () => {
    const location = useLocation();
    const { selectedDishes, ...existingState } = location.state || {};

    console.log(selectedDishes)
    return (
        <div>
            <NavBar/>
            <SideBar/>
            <div>
                {Object.entries(selectedDishes).map(([day, item]) => (
                    <div key={day}>
                        <h2>{day}</h2>
                        {item.map((dish, index) => (
                            <div key={index}>
                                {dish}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Rapport;