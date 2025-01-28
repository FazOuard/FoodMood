import { fetchDataAllPlat } from "../../api/plat_data";
import { useState, useEffect } from 'react';

const useCalculateSum = (dishIds) => {
    const [totals, setTotals] = useState({ proteines: 0, lipides: 0, calories: 0, glucides: 0 });

    useEffect(() => {
        const getData = async () => {
            try {
                const fetchedData = await fetchDataAllPlat(); 
                const filteredData = fetchedData.filter(item => dishIds.includes(item.id));

                const totals = filteredData.reduce(
                    (acc, item) => {
                        acc.proteines += parseFloat(item.Proteines) || 0;
                        acc.lipides += parseFloat(item.Lipides) || 0;
                        acc.calories += parseFloat(item.Calories) || 0;
                        acc.glucides += parseFloat(item.Glucides) || 0;

                        return acc;
                    },
                    { proteines: 0, lipides: 0, calories: 0, glucides: 0 }
                );

                setTotals(totals);
            } catch (error) {
                console.error('Error in fetching data:', error);
            }
        };

        getData();
    }, []);

    return totals;
};

export default useCalculateSum;