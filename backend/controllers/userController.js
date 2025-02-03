import { poolPromise } from '../dbConfig.js';

export const getUsers = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`SELECT u.id, u.username, u.password, u.city, up.*
                                                FROM users u
                                                LEFT JOIN users_preferences up ON u.id = up.user_id
                                                WHERE u.type = 'user';
                                              `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
