import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/navbar/navbar';
import SideBar from '../../components/sidebar/sidebar';

const Rapport = () => {
    const location = useLocation();
    const { selectedDishes, ...existingState } = location.state || {};

    console.log('Existing State:', existingState);
    console.log('Selected Dishes:', selectedDishes);

    return (
        <div>
            <NavBar/>
            <SideBar/>
            <h1>Next Page</h1>
            {/* Render the selected dishes and existing state here */}
        </div>
    );
};

export default Rapport;