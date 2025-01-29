import React from 'react';
import minus from '../../assets/icons/minus.png'
import plus from '../../assets/icons/plus.png'
import './nbrPerson2.css'

const NbrPerson2 = ({ value, onChange }) => {
        const handleMinus = () => {
          if (value > 1) { 
            onChange(value - 1); 
          }
        };
      
        const handlePlus = () => {
          onChange(value + 1);
        };
      
        return (
          <div className='nbr2'>
            <div className='nbr2-minus' onClick={handleMinus}> 
              <img src={minus} />
            </div>
            <div className='nbr2-value'>
              <h4>{value}</h4> 
            </div>
            <div className='nbr2-plus' onClick={handlePlus}>
              <img src={plus} />
            </div>
          </div>
        );
};

export default NbrPerson2;
