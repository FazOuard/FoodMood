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
import { processPreferredDishes } from '../../../api/userPreferencesData';
import like1 from "../../assets/icons/like1.png"


const Profile = () => {
    
    const location = useLocation();
    const state = location.state || {};

    const [user, setUser] = useState();
    const [prefReg, setPrefReg] = useState([]);

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

    useEffect(() => {
        const getData = async () => {
          try {
            const data = await processPreferredDishes("Rabat-Salé-Kenitra"); 
            setPrefReg(data); 
          } catch (error) {
            console.error('Error in fetching data:', error);
          }
        };
    
        getData();
    }, []);

    console.log("this is: ", prefReg)

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
                        <h4>Plats aimés dans votre région</h4>
                        <div className='profile3-dishes'>
                            {prefReg.map((dish1, key1) => (
                                <div className='profile3-dish' key={key1}>
                                    <img src={dish1.image} />
                                    
                                    <div className='profile-dish-image-shadow'/>
                                    <h3>{dish1.dish.charAt(0).toUpperCase() + dish1.dish.slice(1)}</h3>
                                    <div className='profile-dish-like'>
                                        <img src={like1} />
                                        <h5>{dish1.count}</h5>
                                    </div>
                                </div>
                            ))}
                        </div>
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
