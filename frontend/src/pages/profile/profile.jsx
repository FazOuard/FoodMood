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
                <div className='profile1345'>
                    <div className='profile15'>
                        <div className='profile1'>
                            {state.iduser}
                        </div>
                        <div className='profile5'>

                        </div>
                    </div>
                    <div className='profile3'>
                        
                    </div>
                    <div className='profile4'>
                        
                    </div>
                </div>
                <div className='profile2'>

                </div>
            </div>
        </div>
    );
};

export default Profile;
