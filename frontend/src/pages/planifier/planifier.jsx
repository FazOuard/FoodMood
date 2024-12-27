import React, { useEffect, useState } from 'react';
import './planifier.css'
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/navbar/navbar';
import SideBar from '../../components/sidebar/sidebar';
import todo from '../../assets/3Drender/todo.png'
import weekcalendar from '../../assets/3Drender/weekcalendar.png'


const Planifier = () => {

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className='planifier'>
            <NavBar/>
            <SideBar/>
            <div className='planifier0'>
                <div className='planifier-card'>
                    <h2>Planifier une semaine</h2>
                    <img src={weekcalendar} />
                </div>
                <div className='planifier-card'>
                    <h2>Planifier un mois</h2>
                    <img src={todo} />
                </div>
            </div>
        </div>
    );
};

export default Planifier;
