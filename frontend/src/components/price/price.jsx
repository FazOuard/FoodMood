import React, { useEffect, useState } from 'react';
import './price.css'
import axios from 'axios';
import Plat from '../plat/plat';

const Price = ({ value }) => {
        
    const [ing, setIng] = useState([]);
    const [platIng, setPlatIng] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [quantity, setQuantity] = useState([]);

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

    const plat = platIng.find((plat) => plat.idPlat == value);
    
    // Safely handle the case where plat is not found
    if (!plat) {
        return <div>No plat found for the given value.</div>;
    }

    return (
        <div className='price-all'>

        </div>
    );
};

export default Price;
