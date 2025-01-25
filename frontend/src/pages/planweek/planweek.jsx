import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './planweek.css'
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/navbar/navbar';
import SideBar from '../../components/sidebar/sidebar';
import cross from '../../assets/icons/cross.png';
import replace from '../../assets/replace/replace.png'
import searchicon from '../../assets/icons/search.png'
import next from '../../assets/icons/next.png'
import { fetchDataAllPlat } from '../../../api/plat_data'; 


const PlanWeek = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [searchText, setSearchText] = useState('');

    const [data, setData] = useState([]);
    const semaine = ["Jour 1", "Jour 2", "Jour 3", "Jour 4", "Jour 5", "Jour 6", "Jour 7" ];
    
    useEffect(() => {
        const getData = async () => {
        try {
            const data = await fetchDataAllPlat(); 
            setData(data); 
        } catch (error) {
            console.error('Error in fetching data:', error);
        }
        };

        getData();
    }, []);

    const items = data
                    .filter((plat) => plat.Image != null)
                    .map((plat) => (
                        plat.id
                    ))
    
    const [droppedItemsByDay, setDroppedItemsByDay] = useState(
        semaine.reduce((acc, day) => ({ ...acc, [day]: [] }), {})
    );

      // Handle drag start
    const handleDragStart = (event, item) => {
        event.dataTransfer.setData("text", item);
    };
    
      // Handle drop event
    const handleDrop = (event, day) => {
        event.preventDefault();
        const droppedItem = event.dataTransfer.getData("text");

        // Avoid duplicates
        if (!droppedItemsByDay[day].includes(droppedItem)) {
          setDroppedItemsByDay({
            ...droppedItemsByDay,
            [day]: [...droppedItemsByDay[day], droppedItem],
          });
        }
    };
    
      // Allow dropping by preventing default
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleRemove = (item, day) => {
        setDroppedItemsByDay({
            ...droppedItemsByDay,
            [day]: droppedItemsByDay[day].filter((droppedItem) => droppedItem !== item),
        });
    };

    const handleNextClick = () => {
        const existingState = location.state || {};

        const newState = {
            ...existingState, 
            selectedDishes: droppedItemsByDay, 
        };

        navigate('/rapport', { state: newState });
    };
    
    return (
        <div className='planweek'>
            <NavBar/>
            <SideBar/>
            <div className='planifierweek0'>
                <div className='drag-and-drop'>
                    {/* Draggable Items List */}
                    <div className='all-to-drag'>
                        <div className='holder01'>
                        <div className='title-search'>
                            <h3>Choisissez vos plats</h3>
                            <div className="search-drag">
                                <input
                                    type="text"
                                    placeholder="Rechercher un plat..."
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)} 
                                />
                                <img src={searchicon} />
                            </div>
                        </div>
                        </div>
                        <div className='to-drag-items'>
                            {data
                            .filter((plat) => plat.Image != null && plat.Titre.toLowerCase().includes(searchText.toLowerCase()))
                            .map((plat, index1) => (
                                <div key={index1} draggable onDragStart={(event) => handleDragStart(event, plat.id)} className='to-drag-item'>
                                    <img key={plat.id} src={plat.Image} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Drop Area */}
                    <div className='to-drop'>
                        {semaine.map((jour, index2) => (
                            <div onDrop={(event) => handleDrop(event, jour)} onDragOver={handleDragOver} key={index2} className='ONE-day'>

                        <h3>{jour}</h3>
                        <div className='dopped-items'>
                        {droppedItemsByDay[jour].map((item, index3) => (
                            <div key={index3} className='dropped-item'>
                                {data
                                    .filter((plat) => item == plat.id)
                                    .map((plat) => (
                                        <div key={plat.id}>
                                            <img key={plat.id} src={plat.Image} />
                                            <div className='dropped-title-remove'>
                                                <h4>{plat.Titre}</h4>
                                                <div onClick={() => handleRemove(item, jour)}
                                                    style={{
                                                        backgroundColor: "red",
                                                        borderRadius: "4px",
                                                        cursor: "pointer",
                                                        width: "20px",
                                                        height: "20px",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <img src={cross} style={{ width: "10px", height: "10px"}} />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        ))}
                        {
                        Array.from({ length: 4 - droppedItemsByDay[jour].length }).map((_, i) => (
                        <div className='dropped-item'>
                                <img src={replace} />
                                <div className='dropped-title-remove'>
                                    <h4>...</h4>
                                    <div
                                                    style={{
                                                        backgroundColor: "#2C471B",
                                                        borderRadius: "4px",
                                                        cursor: "pointer",
                                                        width: "20px",
                                                        height: "20px",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center"
                                                    }}
                                    >
                                        <img src={cross} style={{ width: "10px", height: "10px"}} />
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='button-suivant' onClick={handleNextClick}>
                <h3>Suivant</h3>
                <img src={next} />
            </div>
        </div>
    );
};

export default PlanWeek;
