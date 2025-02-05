import React, { useEffect, useState } from 'react';
import './planifier.css'
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/navbar/navbar';
import SideBar from '../../components/sidebar/sidebar';
import todo from '../../assets/3Drender/todo.png'
import weekcalendar from '../../assets/3Drender/weekcalendar.png'
import check from '../../assets/icons/check.png'


const Planifier = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state || {};

    const goToPlanWeek = () => {
        navigate('/planSemaine', {state});
    }
    const goToPlanMonth = () => {
        navigate('/planMois', {state});
    }

    return (
        <div className='planifier'>
            <NavBar/>
            <SideBar/>
            <div className='planifier0'>
                <div className='planifier-card' onClick={goToPlanWeek} >
                    <h2>Planifier une semaine</h2>
                    <img src={weekcalendar} />
                    <div className='plan-line'/>
                    <div className='plan-check'>
                        <div className='plan-check-one'>
                            <img src={check}/>
                            <h4>Plannifier les plats d'une semaine.</h4>
                        </div>
                        <div className='plan-check-one'>
                            <img src={check}/>
                            <h4>Optimiser vos courses.</h4>
                        </div>
                        <div className='plan-check-one'>
                            <img src={check}/>
                            <h4>Avoir un bilan de votre semaine.</h4>
                        </div>
                        <div className='plan-check-one'>
                            <img src={check}/>
                            <h4>Estimer votre budget.</h4>
                        </div>
                    </div>
                </div>
                <div className='planifier-card' onClick={goToPlanMonth}>
                    <h2>Planifier un mois</h2>
                    <img src={todo} />
                    <div className='plan-line'/>
                    <div className='plan-check'>
                        <div className='plan-check-one'>
                            <img src={check}/>
                            <h4>Plannifier les plats d'un mois.</h4>
                        </div>
                        <div className='plan-check-one'>
                            <img src={check}/>
                            <h4>Optimiser vos courses.</h4>
                        </div>
                        <div className='plan-check-one'>
                            <img src={check}/>
                            <h4>Avoir un bilan de votre mois.</h4>
                        </div>
                        <div className='plan-check-one'>
                            <img src={check}/>
                            <h4>Estimer votre budget.</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Planifier;
