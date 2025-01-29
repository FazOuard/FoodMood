import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './profile.css'
import NavBar from '../../components/navbar/navbar';
import SideBar from '../../components/sidebar/sidebar';
import { useLocation } from 'react-router-dom';

const Profile = () => {
    
    const location = useLocation();
    const state = location.state || {};

    console.log(state)

    return (
        <div>
            <NavBar/>
            <SideBar/>
            <div className='Profile'>
                {state.iduser}
            </div>
        </div>
    );
};

export default Profile;
