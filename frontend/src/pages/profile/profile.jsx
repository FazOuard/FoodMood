import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './profile.css'
import NavBar from '../../components/navbar/navbar';
import SideBar from '../../components/sidebar/sidebar';
import { useLocation } from 'react-router-dom';
import homme from "../../assets/icons/homme.png"
import femme from "../../assets/icons/femme.png"
import { fetchDataUser } from '../../../api/userData';
import loc from '../../assets/icons/loc.png'
import age from '../../assets/icons/age.png'


const Profile = () => {
    
    const location = useLocation();
    const state = location.state || {};

    const [user, setUser] = useState();

    const iduser = state?.iduser || 2;

    console.log("this is the id in the frontend: ",iduser)

    useEffect(() => {
        const getData = async () => {
          try {
            const data = await fetchDataUser(iduser); 
            setUser(data); 
          } catch (error) {
            console.error('Error in fetching data:', error);
          }
        };
    
        getData();
    }, [iduser]);

    console.log(user)

    return (
        <div>
            <NavBar/>
            <SideBar/>
            <div className='Profile'>
                <div className='profile1345'>
                    <div className='profile15'>
                        <div className='profile1'>
                            <div className='profile1-1'>
                                <img src={femme} />
                                <div className='profile1-1-1'>
                                    <h2>{user?.username.split('@')[0].toUpperCase()}</h2>
                                    <h5>{user?.username}</h5>
                                </div>
                            </div>
                            <div className='horizontal-line-profile'/>
                            <div className='profile1-2'>
                                <div className='profile1-2-1'>
                                    <img src={loc}/>
                                    <h4>{user?.city}</h4>
                                </div>
                                <div className='profile1-2-1'>
                                    <img src={age}/>
                                    <h4>{user?.age}</h4>
                                </div>
                            </div>
                            <div className='profile1-3'>
                                <h3>Changer mon mot de passe</h3>
                            </div>
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
