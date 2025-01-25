import { poolPromise } from '../dbConfig.js';

export const getData = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM plat');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
