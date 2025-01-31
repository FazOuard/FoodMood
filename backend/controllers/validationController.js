import { poolPromise } from '../dbConfig.js';

export const getValidation = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM validation');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
};



export const deleteValidation = async (req, res) => {
    const { id } = req.params;  
    
    try {
      const pool = await poolPromise;
      await pool
        .request()
        .input('id', id)
        .query(`
          DELETE FROM validation WHERE id = @id
        `);
      
      res.status(200).json({ message: "Plat supprimé avec succès" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
  
  