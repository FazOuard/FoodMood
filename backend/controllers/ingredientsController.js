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
  const { Ingredient, Valeur, Unite, Prix } = req.body; // Correspond aux noms des champs envoyés depuis le frontend

  // Vérification de la présence de toutes les informations
  if (!Ingredient || !Valeur || !Unite || !Prix) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  try {
    const pool = await poolPromise;
    const request = pool.request();

    // Assurez-vous de bien passer les bons types à la requête SQL
    request.input("Ingredient", sql.VarChar, Ingredient);
    request.input("Valeur", sql.Int, Valeur);
    request.input("Unite", sql.VarChar, Unite);
    request.input("Prix", sql.VarChar, Prix);

    // Requête d'insertion dans la base de données
    await request.query(
      "INSERT INTO Ingredients (Ingredient, Valeur, Unite, Prix) VALUES (@Ingredient, @Valeur, @Unite, @Prix)"
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
    
    // Récupérer le nom de l'ingrédient à partir de son ID
    const request = pool.request();
    request.input("id", sql.Int, id);
    const ingredientResult = await request.query("SELECT Ingredient FROM Ingredients WHERE Id = @id");

    if (ingredientResult.recordset.length === 0) {
      return res.status(404).json({ error: "Ingrédient introuvable" });
    }

    const ingredientName = ingredientResult.recordset[0].Ingredient;

    // Vérifier si l'ingrédient est utilisé dans un plat
    const checkRequest = pool.request();
    checkRequest.input("ingredientName", sql.NVarChar, `%${ingredientName}%`);
    
    checkRequest.input("id0", sql.NVarChar, id);
    //const checkResult = await checkRequest.query("SELECT * FROM Plat WHERE Ingredients LIKE @ingredientName");
    const checkResult = await checkRequest.query(`
                                                  SELECT * 
                                                  FROM [dbo].[IngredientsPlat] 
                                                  WHERE CHARINDEX(',' + @id0 + ',', ',' + REPLACE(idIng, ' ', '') + ',') > 0;`);

    if (checkResult.recordset.length > 0) {
      return res.status(400).json({ error: "Impossible de supprimer cet ingrédient, car il est utilisé dans un plat." });
    }

    // Supprimer l'ingrédient s'il n'est pas utilisé
    //await request.query("DELETE FROM Ingredients WHERE Id = @id");
    res.status(200).json({ message: "Ingrédient supprimé avec succès" });

  } catch (error) {
    console.error("Erreur lors de la suppression de l'ingrédient :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};



export const updateIngredient = async (req, res) => {
  const { id } = req.params;
  const { Ingredient, Valeur, Unite, Prix } = req.body;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID invalide" });
  }

  if (!Ingredient || !Valeur || !Unite || !Prix) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  try {
    const pool = await poolPromise;
    const request = pool.request();
    
    request.input("id", sql.Int, parseInt(id));
    request.input("Ingredient", sql.VarChar, Ingredient);
    request.input("Valeur", sql.Int, Valeur);
    request.input("Unite", sql.VarChar, Unite);
    request.input("Prix", sql.VarChar, Prix);

    const result = await request.query(
      "UPDATE Ingredients SET Ingredient = @Ingredient, Valeur = @Valeur, Unite = @Unite, Prix = @Prix WHERE Id = @id"
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



