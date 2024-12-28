import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './planweek.css'
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/navbar/navbar';
import SideBar from '../../components/sidebar/sidebar';


const PlanWeek = () => {

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className='planweek'>
            <NavBar/>
            <SideBar/>
            <div className='planifier0'>
                we are in lan week
            </div>
        </div>
    );
};

export default PlanWeek;
