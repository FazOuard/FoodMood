import axios from 'axios';

export const fetchLikedDishes = async (id) => {
    try {
      
        const response = await axios.get('http://localhost:5000/likedDishes');
        const data = response.data;
        const filteredData = data
                            .filter((item) => item.user_id === id)
                            .map((item2) => item2.plat)
                            
        const response2 = await axios.get('http://localhost:5000/data');
        const plats = response2.data
        const filteredplat = plats.filter((plat) => filteredData.includes(plat.Titre))
    
        return filteredplat;
    } catch (error) {
      console.error('Error fetching liked dishes:', error);
      throw error;
    }
  };