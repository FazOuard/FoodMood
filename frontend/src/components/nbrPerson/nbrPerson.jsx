import React from 'react';
import minus from '../../assets/icons/minus.png'
import plus from '../../assets/icons/plus.png'
import profile from '../../assets/icons/profile2.png'
import './nbrPerson.css'

const NbrPerson = ({ value, onChange }) => {
        const handleMinus = () => {
          if (value > 1) { 
            onChange(value - 1); 
          }
        };
      
        const handlePlus = () => {
          onChange(value + 1);
        };
      
        return (
          <div className='nbr'>
            <div className='nbr-minus' onClick={handleMinus}> 
              <img src={minus} />
            </div>
            <div className='nbr-value'>
              <h4>{value}</h4> 
              <img src={profile} />
            </div>
            <div className='nbr-plus' onClick={handlePlus}>
              <img src={plus} />
            </div>
          </div>
        );
};

export default NbrPerson;
