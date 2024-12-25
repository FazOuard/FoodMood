import React, { useEffect, useState } from 'react';
import './sidebar.css'

const SideBar = () => {
    
    return (
        <div className='sidebar-all'>
            <div className='sidebar-choices1'>
                <h4>Tout nos plats</h4>
                <div className='sidebar-line'/>
                <h4>Mes statistiques</h4>
                <div className='sidebar-line'/>
                <h4>Plannifier</h4>
                <div className='sidebar-line'/>
                <h4>Mon profile</h4>
            </div>
            <div className='sidebar-choices2'>
                <div className='sidebar-line'/>
                <h4>Se déconnecter</h4>
            </div>
        </div>
    );
};

export default SideBar;
