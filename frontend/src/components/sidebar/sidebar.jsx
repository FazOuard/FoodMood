import React, { useEffect, useState } from 'react';
import './sidebar.css'
import profile from '../../assets/icons/profile.png'
import calendar from '../../assets/icons/calendar.png'
import stat from '../../assets/icons/stat.png'
import dish from '../../assets/icons/dish.png'
import magic from '../../assets/icons/magic.png'
import logout from '../../assets/icons/logout.png'
import { useNavigate, useLocation } from 'react-router-dom';

const SideBar = () => {

    const navigate = useNavigate();

    
    const location = useLocation();
    const state = location.state || {};

    const goToAllDishes = () => {
        navigate('/plats', {state});
    }
    const goToPlan = () => {
        navigate('/planifier', {state});
    }

    const goTostatistics = () => {
        navigate('/statistiques', {state});
    }

    const goToProfile = () => {
        navigate("/profile", {state})
    }
    
    return (
        <div className='sidebar-all'>
            <div className='sidebar-choices1'>
                <div className='sidebar-recom'>
                    <img src={magic} />
                    <h4>Recommander</h4>
                </div>
                <div className='sidebar-choice' onClick={goToAllDishes}>
                    <img src={dish} />
                    <h4>Tout nos plats</h4>
                </div>
                <div className='sidebar-line'/>
                <div className='sidebar-choice' onClick={goTostatistics}>
                    <img src={stat} />
                    <h4>Mes statistiques</h4>
                </div>
                <div className='sidebar-line'/>
                <div className='sidebar-choice' onClick={goToPlan}>
                    <img src={calendar} />
                    <h4>Plannifier</h4>
                </div>
                <div className='sidebar-line'/>
                <div className='sidebar-choice' onClick={goToProfile}>
                    <img src={profile} />
                    <h4>Mon profile</h4>
                </div>
            </div>
            <div className='sidebar-choices2'>
                <div className='sidebar-line'/>
                <div className='sidebar-choice'>
                    <img src={logout} />
                    <h4>Se déconnecter</h4>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
