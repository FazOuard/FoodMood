import axios from 'axios';

export const fetchDataAllPlat = async () => {
    try {
      const cachedData = sessionStorage.getItem('data');
      if (cachedData) {
        return JSON.parse(cachedData);
      }

      const response = await axios.get('http://localhost:5000/data');
      const data = response.data;
  
      sessionStorage.setItem('data', JSON.stringify(data));
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };


  export const fetchIngGroupPlat = async (idsPlats) => {
    try {
  
      const response = await axios.post('http://localhost:5000/IngGroupPlat', {
        idsPlats: idsPlats,
        nombresPersonnes: Array(idsPlats.length).fill(1),
      });
  
      const data = response.data;
      return data;

    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };



