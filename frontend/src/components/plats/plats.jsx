import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './plats.css'
import { useLocation, useNavigate } from 'react-router-dom';
import searchicon from '../../assets/icons/search.png'

const Plats = () => {
  
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchText, setSearchText] = useState('');
  const [CaloriesInterval, setCaloriesInterval] = useState([0, 600]);
 
  const goToOneDish = (idplat) => {
    navigate("/platinfo", {state: { ...(location.state || {}), idplat } })
  }

  useEffect(() => {
    axios.get('http://localhost:5000/data')
      .then(response => {
        setData(response.data);
        console.log(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  
  const handleImageError = (e) => {
    e.target.src = 'path/to/placeholder-image.jpg'; 
  };

  const filteredData = data.filter((item) => {
    const matchesSearchText = searchText
      ? item.Titre?.toLowerCase().includes(searchText.toLowerCase())
      : true;
    const matchesCaloriesInterval = item.Calories && item.Calories >= CaloriesInterval[0] && item.Calories <= CaloriesInterval[1];

    return matchesSearchText && matchesCaloriesInterval;
  });


  return (
    <div className='ALL'>
      <h1>Nos plats</h1>
      <div className='search'>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Rechercher un plat..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <img src={searchicon} />
        </div>
        <div className="calories-filter">
          <label>Calories: <span style={{color: "#CECECE", fontWeight:"regular", fontSize: "15px"}}>{`De ${CaloriesInterval[0]} à ${CaloriesInterval[1]} Kcal`}</span></label>
          <div className='calories-filter1'>
            <h4>De:</h4>
          <input
            type="number"
            min="0"
            max={CaloriesInterval[1] - 1}
            value={CaloriesInterval[0]}
            onChange={(e) => setCaloriesInterval([Number(e.target.value), CaloriesInterval[1]])}
          />
          <h4>à:</h4>
          <input
            type="number"
            min={CaloriesInterval[0] + 1}
            max="600"
            value={CaloriesInterval[1]}
            onChange={(e) => setCaloriesInterval([CaloriesInterval[0], Number(e.target.value)])}
          />
          </div>
        </div>
      </div>
      <div className='plats0'>
        {filteredData.filter((item) => item.Image != null)
        .map((item, index) => (
          <div key={index} className='un_plat' onClick={() => goToOneDish(item.id)}>
            {item.Image ? (
              <div className='plats_img'>
                <img src={item.Image} alt={item.Titre} onError={handleImageError} />
                <div className='shadow'></div>
                <h2>{item.Titre}</h2>
              </div>
            ) : null}
          </div>
        ))}
    </div>
    </div>
  );
};

export default Plats;
