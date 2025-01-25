import axios from 'axios';

export const fetchDataAllPlat = async () => {
  try {
    const response = await axios.get('http://localhost:5000/data');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
