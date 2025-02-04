import { poolPromise } from '../dbConfig.js';

export const getLastIdIngredientsPlat = async () => {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query('SELECT MAX(id) AS lastId FROM IngredientsPlat');
      return result.recordset[0].lastId || 0; // Si pas d'ID, retourner 0
    } catch (err) {
      console.error('Erreur lors de la récupération du dernier ID dans IngredientsPlat:', err.message);
      throw err;
    }
  };
  
  export const addDataIngredientsPlat = async (req, res) => {
    const { idPlat, idIng, Quantite } = req.body;
  
    try {
  
      const pool = await poolPromise;
      await pool
        .request()
        .input('idPlat', idPlat)
        .input('idIng', idIng)
        .input('Quantite', Quantite)
        .query(`
          INSERT INTO IngredientsPlat (idPlat, idIng, Quantite)
          VALUES (@idPlat, @idIng, @Quantite)
        `);
  
      res.status(201).json({ message: "Ingrédient ajouté avec succès au plat" });
    } catch (err) {
      res.status(500).send({ message: "Erreur lors de l'ajout de l'ingrédient", error: err.message });
    }
  };
  