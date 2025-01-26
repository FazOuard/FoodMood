import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './plat_info.css'
import { useLocation, useNavigate } from 'react-router-dom';
import RandomPlats from '../../components/randomPlats/randomPlats';
import Plat from '../../components/plat/plat';
import NavBar from '../../components/navbar/navbar';
import SideBar from '../../components/sidebar/sidebar';
import Estimate from '../../components/estimate/estimate';
import Recommend from '../recommendation/recommend';


const Plat_info = () => {

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className='plat_info'>
            <NavBar/>
            <SideBar/>
            <div className='plat_info1'>
                <div><RandomPlats /></div>
                <div><Plat/></div>
                <div><Estimate/></div>
            </div>
        </div>
    );
};

export default Plat_info;
