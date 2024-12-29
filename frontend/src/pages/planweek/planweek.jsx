import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './planweek.css'
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/navbar/navbar';
import SideBar from '../../components/sidebar/sidebar';


const PlanWeek = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [data, setData] = useState([]);

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
    
    const [droppedItems, setDroppedItems] = useState([]);
    
      // Handle drag start
    const handleDragStart = (event, item) => {
        event.dataTransfer.setData("text", item);
    };
    
      // Handle drop event
    const handleDrop = (event) => {
        event.preventDefault();
        const droppedItem = event.dataTransfer.getData("text");
    
        // Avoid duplicates
        if (!droppedItems.includes(droppedItem)) {
          setDroppedItems([...droppedItems, droppedItem]);
          setItems(items.filter((item) => item !== droppedItem));
        }
    };
    
      // Allow dropping by preventing default
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleRemove = (item) => {
        setDroppedItems(droppedItems.filter((droppedItem) => droppedItem !== item));
        setItems([...items, item]);
    };
    
    
    return (
        <div className='planweek'>
            <NavBar/>
            <SideBar/>
            <div className='planifierweek0'>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    {/* Draggable Items List */}
                    <div style={{ border: "1px solid #ccc", padding: "10px", width: "40%" }}>
                        <h3>Déplacez ces plats</h3>
                        <div className='to-drag-items'>
                        {items.map((item, index) => (
                            <div
                                key={index}
                                draggable
                                onDragStart={(event) => handleDragStart(event, item)}
                                className='to-drag-item'
                            >
                                {data.filter((plat) => item == plat.id)
                                    .map((plat) => (
                                        <img key={plat.id} src={plat.Image} />
                                    ))}
                            </div>
                        ))}
                    </div>
                    </div>

                    {/* Drop Area */}
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        width: "40%",
                        minHeight: "200px",
                        }}
                    >
                    <h3>Drop Here</h3>
                    {droppedItems.map((item, index) => (
                    <div
                        key={index}
                        style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px",
                        margin: "5px 0",
                        backgroundColor: "#d4f7d4",
                        }}
                    >
                        {item}
                        <button
                        onClick={() => handleRemove(item)}
                        style={{
                            marginLeft: "10px",
                            backgroundColor: "red",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                        >
                        ×
                        </button>
                    </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanWeek;
