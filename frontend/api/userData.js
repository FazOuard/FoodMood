import axios from 'axios';

export const fetchDataUsers = async () => {
    try {
      const cachedData = sessionStorage.getItem('users');
      if (cachedData) {
        return JSON.parse(cachedData);
      }

      const response = await axios.get('http://localhost:5000/users');
      const data = response.data;
  
      sessionStorage.setItem('users', JSON.stringify(data));
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  export const fetchDataUser = async (id) => {
    try {
      console.log("the fonction is called with id: ", id)
      const cachedData = sessionStorage.getItem('users');
      if (cachedData) {
        const data = JSON.parse(cachedData)
        const filtereddata = data.find((item) => (item.id === id))
        return filtereddata;
      }

      const response = await axios.get('http://localhost:5000/users');
      const data = response.data;
      sessionStorage.setItem('users', JSON.stringify(data));
      const filtereddata = data.find((item) => (item.id === id))
      return filtereddata;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };