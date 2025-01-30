// backend/controllers/ingredientController.js
import { poolPromise } from '../dbConfig.js';
import { sql } from '../dbConfig.js';

export const getIngredients = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Ingredients");
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Erreur lors de la récupération des ingrédients :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const addIngredient = async (req, res) => {
  const { name, value, unit, price } = req.body; // Ajout des nouvelles colonnes

  if (!name || !value || !unit || !price) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  try {
    const pool = await poolPromise;
    const request = pool.request();
    request.input("name", sql.VarChar, name);
    request.input("value", sql.Int, value);
    request.input("unit", sql.VarChar, unit);
    request.input("price", sql.VarChar, price);

    await request.query(
      "INSERT INTO Ingredients (Ingrédient, Valeur, Unité, Prix) VALUES (@name, @value, @unit, @price)"
    );

    res.status(201).json({ message: "Ingrédient ajouté avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'ingrédient :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


export const deleteIngredient = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    const request = pool.request();
    request.input("id", sql.Int, id);
    await request.query("DELETE FROM Ingredients WHERE Id = @id");
    res.status(200).json({ message: "Ingrédient supprimé" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'ingrédient :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const updateIngredient = async (req, res) => {
  const { id } = req.params;
  const { name, value, unit, price } = req.body;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID invalide" });
  }

  if (!name || !value || !unit || !price) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  try {
    const pool = await poolPromise;
    const request = pool.request();
    request.input("id", sql.Int, parseInt(id));
    request.input("name", sql.VarChar, name);
    request.input("value", sql.Int, value);
    request.input("unit", sql.VarChar, unit);
    request.input("price", sql.VarChar, price);

    const result = await request.query(
      "UPDATE Ingredients SET Ingrédient = @name, Valeur = @value, Unité = @unit, Prix = @price WHERE Id = @id"
    );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "Ingrédient non trouvé" });
    }

    res.status(200).json({ message: "Ingrédient mis à jour avec succès" });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'ingrédient :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


