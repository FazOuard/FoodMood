import axios from 'axios';

export const fetchIngData = async () => {
    try {
      const cachedData = sessionStorage.getItem('Ingredients');
      if (cachedData) {
        return JSON.parse(cachedData);
      }

      const response = await axios.get('http://localhost:5000/ingredients2');
      const data = response.data;
  
      sessionStorage.setItem('Ingredients', JSON.stringify(data));
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };