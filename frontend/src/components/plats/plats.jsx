import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './plats.css'
import { useLocation, useNavigate } from 'react-router-dom';

const Plats = () => {
  
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const goToOneDish = (idplat) => {
    navigate("/Plat", {state: { ...(location.state || {}), idplat } })
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

  return (
    <div className='ALL'>
      <h1>Nos plats</h1>
      <div className='plats0'>
        {data.filter((item) => item.Image != null)
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
