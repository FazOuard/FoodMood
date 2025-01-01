import React, { useEffect, useState } from 'react';
import './price.css'
import axios from 'axios';

const Price = ({ value }) => {
        
    const [ing, setIng] = useState([]);
    const [platIng, setPlatIng] = useState([]);

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

    const plating = platIng.filter((plat) => plat.idPlat == value)

    return (
        <div className='price-all'>
        {plating.length > 0 ? (
            <>
                <p>Dish ID: {plating[0].idPlat}</p>
                <p>{plating[0].idIng}</p>
                <p>{plating[0].Quantite}</p>
            </>
        ) : (
            <p>No data available for the selected dishes.</p>
        )}
    </div>
    );
};

export default Price;
