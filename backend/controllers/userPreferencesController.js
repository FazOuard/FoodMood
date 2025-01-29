import { poolPromise } from '../dbConfig.js';

export const getUsersPreferences = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM users_preferences');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
};


export const deleteUser = async (req, res) => {
  const { id } = req.params;  
  
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input('id', id)
      .query(`
        DELETE FROM users_preferences WHERE id = @id
      `);
    
    res.status(200).json({ message: "Plat supprimé avec succès" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

