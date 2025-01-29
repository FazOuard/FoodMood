import { poolPromise } from '../dbConfig.js';

export const getLastId = async () => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query('SELECT MAX(id) AS lastId FROM historique');
      return result.recordset[0].lastId || 0; // Si pas d'ID, retourner 0
    } catch (err) {
      console.error('Erreur lors de la récupération du dernier ID:', err.message);
      throw err;
    }
  };
  
  
  export const addHistorique = async (req, res) => {
    const { user_id, plat } = req.body;
    const date_interaction = new Date();
    try {
      // Récupérer le dernier ID et l'incrémenter de 1
      const lastId = await getLastId();
      const newId = lastId + 1; // Incrémentation de l'ID
        
      const pool = await poolPromise;
      await pool
        .request()
        .input('id', newId)
        .input('user_id', user_id)
        .input('plat', plat)
        .input('date_interaction', date_interaction)
        .query(`
          INSERT INTO historique (id, user_id, plat, date_interaction)
          VALUES (@id, @user_id, @plat, @date_interaction)
        `);
  
      res.status(201).json({ message: "Plat ajouté avec succès" });
    } catch (err) {
      res.status(500).send({ message: "Erreur lors de l'ajout du plat", error: err.message });
    }
  };


  export const deleteHistorique = async (req, res) => {
    const { user_id, plat } = req.params;  
    
    try {
      const pool = await poolPromise;
      await pool
        .request()
        .input('user_id', user_id)
        .input('plat', plat)
        .query(`
          DELETE FROM historique WHERE user_id = @user_id AND plat = @plat
        `);
      
      res.status(200).json({ message: "Plat supprimé avec succès" });
    } catch (err) {
      res.status(500).send({ message: "Erreur lors de la suppression du plat", error: err.message });
    }
  };

