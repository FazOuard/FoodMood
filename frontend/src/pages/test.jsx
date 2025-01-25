import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlatIngredients = () => {
  const [idPlat, setIdPlat] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!idPlat) return; // Don't fetch if idPlat is empty
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/platIng/${idPlat}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idPlat) {
      fetchData();
    }
  }, [idPlat]);

  return (
    <div>
      <h1>Plat Ingredients</h1>
      <label htmlFor="idPlat">Select Plat ID:</label>
      <input
        type="number"
        id="idPlat"
        value={idPlat}
        onChange={(e) => setIdPlat(e.target.value)}
        placeholder="Enter Plat ID"
      />
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>

      <table>
        <thead>
          <tr>
            <th>Ingredient ID</th>
            <th>Ingredient Name</th>
            <th>Quantity Needed</th>
            <th>Unit</th>
            <th>Valeur</th>
            <th>Price Per Unit</th>
            <th>Total Price For Quantity</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.IngredientID}</td>
              <td>{row.IngredientName}</td>
              <td>{row.QuantityNeeded}</td>
              <td>{row.Unit}</td>
              <td>{row.Valeur}</td>
              <td>{row.PricePerUnit}</td>
              <td>{row.TotalPriceForQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlatIngredients;