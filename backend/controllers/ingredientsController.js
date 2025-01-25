import { poolPromise } from '../dbConfig.js';

export const getIngredients = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Ingredients');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
