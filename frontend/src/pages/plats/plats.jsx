import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './plats.css'
import Plats from '../../components/plats/plats';
import NavBar from '../../components/navbar/navbar';
import SideBar from '../../components/sidebar/sidebar';
import Recommend from '../recommendation/recommend';

const Plat_All = () => {

    return (
        <div className='plat_all'>
            <NavBar/>
            <SideBar/>
            <div className='plat_all1'> 
                <Recommend/>
                <Plats/>
            </div>
        </div>
    );
};

export default Plat_All;
