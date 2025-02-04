import { poolPromise } from '../dbConfig.js';


export const getHistoriqueID = async (req, res) => {
  const { user_id, plat } = req.query;

  if (!user_id || !plat) {
    return res.status(400).send('Les paramètres user_id et plat sont requis');
  }

  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input('user_id', user_id)
      .input('plat', plat)
      .query('SELECT * FROM historique WHERE user_id = @user_id AND plat = @plat');

    // Si le plat est trouvé dans l'historique
    if (result.recordset.length > 0) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (err) {
    console.error("Erreur de la requête SQL:", err);
    res.status(500).send('Erreur côté serveur: ' + err.message);
  }
};



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

    console.log("User ID received:", user_id); // Debugging

    try {
        const pool = await poolPromise;
        await pool
            .request()
            .input('user_id', user_id)
            .input('plat', plat)
            .input('date_interaction', date_interaction)
            .query(`
                INSERT INTO historique (user_id, plat, date_interaction)
                VALUES (@user_id, @plat, @date_interaction)
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

