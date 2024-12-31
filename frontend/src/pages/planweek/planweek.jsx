import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './planweek.css'
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/navbar/navbar';
import SideBar from '../../components/sidebar/sidebar';
import cross from '../../assets/icons/cross.png';
import replace from '../../assets/replace/replace.png'


const PlanWeek = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [data, setData] = useState([]);
    const semaine = ["Jour 1", "Jour 2", "Jour 3", "Jour 4", "Jour 5", "Jour 6", "Jour 7" ];

    useEffect(() => {
        axios.get('http://localhost:5000/data')
          .then(response => {
            setData(response.data);
            console.log(response.data);
          })
          .catch(error => console.error('Error fetching data:', error));
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
    
    
    return (
        <div className='planweek'>
            <NavBar/>
            <SideBar/>
            <div className='planifierweek0'>
                <div className='drag-and-drop'>
                    {/* Draggable Items List */}
                    <div className='all-to-drag'>
                        <h3>Choisissez vos plats</h3>
                        <div className='to-drag-items'>
                            {items.map((item, index) => (
                                <div key={index} draggable onDragStart={(event) => handleDragStart(event, item)} className='to-drag-item'>
                                    {data.filter((plat) => item == plat.id)
                                        .map((plat) => (
                                            <img key={plat.id} src={plat.Image} />
                                        ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Drop Area */}
                    <div className='to-drop'>
                        {semaine.map((jour, index) => (
                            <div onDrop={(event) => handleDrop(event, jour)} onDragOver={handleDragOver} key={index} className='ONE-day'>

                        <h3>{jour}</h3>
                        <div className='dopped-items'>
                        {droppedItemsByDay[jour].map((item, index) => (
                            <div key={index} className='dropped-item'>
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
        </div>
    );
};

export default PlanWeek;
