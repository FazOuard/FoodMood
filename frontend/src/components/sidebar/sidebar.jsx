import React, { useEffect, useState } from 'react';
import './sidebar.css'
import profile from '../../assets/icons/profile.png'
import calendar from '../../assets/icons/calendar.png'
import stat from '../../assets/icons/stat.png'
import dish from '../../assets/icons/dish.png'
import magic from '../../assets/icons/magic.png'
import logout from '../../assets/icons/logout.png'

const SideBar = () => {
    
    return (
        <div className='sidebar-all'>
            <div className='sidebar-choices1'>
                <div className='sidebar-recom'>
                    <img src={magic} />
                    <h4>Recommander</h4>
                </div>
                <div className='sidebar-choice'>
                    <img src={dish} />
                    <h4>Tout nos plats</h4>
                </div>
                <div className='sidebar-line'/>
                <div className='sidebar-choice'>
                    <img src={stat} />
                    <h4>Mes statistiques</h4>
                </div>
                <div className='sidebar-line'/>
                <div className='sidebar-choice'>
                    <img src={calendar} />
                    <h4>Plannifier</h4>
                </div>
                <div className='sidebar-line'/>
                <div className='sidebar-choice'>
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
