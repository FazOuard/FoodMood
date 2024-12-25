import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './plat_info.css'
import { useLocation, useNavigate } from 'react-router-dom';
import RandomPlats from '../../components/randomPlats/randomPlats';
import Plat from '../../components/plat/plat';

const Plat_info = () => {

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className='plat_info'>
            <div className='plat_info1'>
                <div><RandomPlats /></div>
                <div><Plat/></div>
            </div>
        </div>
    );
};

export default Plat_info;
