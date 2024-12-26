import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './estimate.css';
import { useLocation } from 'react-router-dom';

const Estimate = () => {
    const [data, setData] = useState([]);
    const [ing, setIng] = useState([]);
    const [platIng, setPlatIng] = useState([]);

    const location = useLocation();
    const state = location.state || {};

    useEffect(() => {
        axios.get('http://localhost:5000/data')
          .then(response => {
            setData(response.data);
          })
          .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:5000/ingredients')
          .then(response => {
            setIng(response.data);
          })
          .catch(error => console.error('Error fetching ingredients:', error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:5000/platsIng')
          .then(response => {
            setPlatIng(response.data);
          })
          .catch(error => console.error('Error fetching ingredients of dishes:', error));
    }, []);

    const filteredIng = platIng.filter((item) => (item.idPlat == state.idplat || item.idPlat == 7))
  
    const idIngList = filteredIng
        .map((item) => item.idIng) 
        .flatMap((idIng) => idIng.split(",").map((value) => parseFloat(value.trim())));

    const idIngListQuantity = filteredIng
        .map((item) => item.Quantite) 
        .flatMap((Quantite) => Quantite.split(",").map((value) => parseFloat(value.trim())));

    const estimatedBudget = idIngList.reduce((total, id, index) => {
          const ingredient = ing.find((item) => item.Id === id);
          if (!ingredient) {
              console.error(`Ingredient with ID ${id} not found`);
              return total;
          }
          const pricePerUnit = ingredient.Prix / ingredient.Valeur;
          const requiredQuantity = idIngListQuantity[index];
          return total + pricePerUnit * requiredQuantity;
      }, 0);

    return (
        <div className='estimate-all'>
            <div>
              <h2>Ingrédients</h2>
              <div className='estimate-line'/>
              {ing
              .filter((item) => (idIngList.includes(item.Id)))
              .map((ingid, index) => (
                <div key={index} className='estimate-oneIng'>
                  <div className='estimate-ing-price'>
                  <h4>{ingid.Ingredient}</h4>
                  <h6>({idIngListQuantity[index] * ingid.Prix / ingid.Valeur} MAD)</h6>
                  </div>
                  <div className='estimate-quantity'>
                    <h4>{idIngListQuantity[index]}
                    {ingid.Unite}</h4>
                    </div>
                </div>
              ))}
            </div>
            
            <div className='estimate-line'/>
            <div className='estimate-price'>
              <h3>TOTAL: {estimatedBudget.toFixed(2)} MAD</h3>
            </div>
        </div>
    );
};

export default Estimate;
