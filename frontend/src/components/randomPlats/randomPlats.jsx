import React, { useEffect, useState } from 'react';
import './randomPlats.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchDataAllPlat } from '../../../api/plat_data'; 

const RandomPlats = () => {
  
  const [data, setData] = useState([]);
  const [randomIds, setRandomIds] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const goToOneDish = (idplat) => {
    navigate("/platinfo", {state: { ...(location.state || {}), idplat } })
  }

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

  useEffect(() => {
    if (data.length > 0) {
      const ids = data.filter((item) => item.Image != null).map((item) => item.id);
      const randomSet = new Set();

      while (randomSet.size < 4 && randomSet.size < ids.length) {
        const randomIndex = Math.floor(Math.random() * ids.length);
        randomSet.add(ids[randomIndex]);
      }
      setRandomIds([...randomSet]);
    }
  }, [data]);

  const handleImageError = (e) => {
    e.target.src = 'path/to/placeholder-image.jpg'; 
  };

  return (
    <div className='randomPlats'>
      <div className='randomPlats-all'>
        {data.filter((item) => item.Image != null && randomIds.includes(item.id))
        .map((item, index) => (
          <div key={index} className='randomPlats-one' onClick={() => goToOneDish(item.id)}>
            {item.Image ? (
              <div className='randomPlats-img'>
                <img src={item.Image} alt={item.Titre} onError={handleImageError} />
                <div className='randomPlats-shadow'/>
                <h2>{item.Titre}</h2>
              </div>
            ) : null}
          </div>
        ))}
        </div>
    </div>
  );
};

export default RandomPlats;
