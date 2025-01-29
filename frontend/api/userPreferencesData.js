import axios from 'axios';
import { fetchDataAllPlat } from './plat_data';

export const fetchDataPref = async () => {
    try {
      const cachedData = sessionStorage.getItem('pref');
      if (cachedData) {
        return JSON.parse(cachedData);
      }

      const response = await axios.get('http://localhost:5000/userPreference');
      const data = response.data;
  
      sessionStorage.setItem('pref', JSON.stringify(data));
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
};

export const fetchDataPrefreg = async (Region) => {
    try {
      const cachedData = sessionStorage.getItem('pref1');
      if (cachedData) {
        const data = JSON.parse(cachedData);
        const filteredData = data.filter((item) => (item.Region === Region)); 
        return filteredData;
      }

      const response = await axios.get('http://localhost:5000/userPreference');
      const data = response.data;
      sessionStorage.setItem('pref1', JSON.stringify(data));

      const filteredData = data.filter((item) => (item.Region === Region)); 

      return filteredData;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
};

export const getTopPreferredDishes = (data) => {
    const dishCount = {};

    data.forEach(item => {
        if (item.Plat_prefere) {
            const dishes = item.Plat_prefere.split(',')
                .map(dish => dish.trim().toLowerCase()); 

            dishes.forEach(dish => {
                dishCount[dish] = (dishCount[dish] || 0) + 1; 
            });
        }
    });

    const sortedDishes = Object.entries(dishCount)
        .sort((a, b) => b[1] - a[1]) 
        .map(([dish, count]) => ({ dish, count }));

    return sortedDishes;
};

// export const processPreferredDishes = async (region) => {
//     try {
//         const data = await fetchDataPrefreg(region); 
//         const sortedDishes = getTopPreferredDishes(data);

//         console.log("Most preferred dishes:", sortedDishes);
//         return sortedDishes;
//     } catch (error) {
//         console.error("Error processing dishes:", error);
//     }
// };

export const processPreferredDishes = async (region) => {
    try {
        const data = await fetchDataPrefreg(region);
        const sortedDishes = getTopPreferredDishes(data);

        const allDishes = await fetchDataAllPlat();

        const mergedDishes = sortedDishes.map(dish => {
            const matchedDish = allDishes.find(item => item.Titre.toLowerCase() === dish.dish);
            return {
                ...dish,
                id: matchedDish ? matchedDish.id : null,
                image: matchedDish? matchedDish.Image : null,
            };
        });

        const top5 = getTop5Dishes(mergedDishes);
        return top5;
    } catch (error) {
        console.error("Error processing dishes:", error);
        return [];
    }
};

export const getTop5Dishes = (dishes) => {
    return dishes
        .filter(dish => dish.id !== null && dish.image !== null) 
        .slice(0, 5); 
};


export const fetchDataPrefage = async (age) => {
    try {
      const cachedData = sessionStorage.getItem('pref2');
      if (cachedData) {
        const data = JSON.parse(cachedData);
        const filteredData = data.filter((item) => (item.age === age)); 
        return filteredData;
      }

      const response = await axios.get('http://localhost:5000/userPreference');
      const data = response.data;
      sessionStorage.setItem('pref2', JSON.stringify(data));

      const filteredData = data.filter((item) => (item.age === age)); 

      return filteredData;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
};