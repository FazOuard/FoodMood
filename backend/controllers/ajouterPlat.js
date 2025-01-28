import { poolPromise } from '../dbConfig.js';
import { sql } from '../dbConfig.js';

const addDish = async (req, res) => {
  const { titre, recette, duree, ingredients, calories, proteines, lipides, glucides, image, cuisine, categorie } = req.body;

  try {
    const pool = await poolPromise;
    const request = pool.request();

    // Vérifier si le plat existe déjà
    request.input("titre", sql.VarChar, titre);
    const result = await request.query("SELECT * FROM Plat WHERE Titre = @titre");

    if (result.recordset.length > 0) {
      return res.status(400).json({ success: false, error: "Ce plat existe déjà." });
    }

    // Insérer le plat dans la base de données
    request.input("recette", sql.Text, recette);
    request.input("duree", sql.Int, duree);
    request.input("ingredients", sql.VarChar, ingredients.join(",")); // Stocker les ingrédients sous forme de chaîne
    request.input("calories", sql.Int, calories);
    request.input("proteines", sql.Int, proteines);
    request.input("lipides", sql.Int, lipides);
    request.input("glucides", sql.Int, glucides);
    request.input("image", sql.VarChar, image);
    request.input("cuisine", sql.VarChar, cuisine);
    request.input("categorie", sql.VarChar, categorie);
    request.input("youtube", sql.VarChar, null); // La vidéo est toujours null

    await request.query(
      "INSERT INTO ajoutPlat (Titre, Recette, Duree, Ingredients, Calories, Proteines, Lipides, Glucides, Youtube, Image, Cuisine, Cathegorie) " +
      "VALUES (@titre, @recette, @duree, @ingredients, @calories, @proteines, @lipides, @glucides, @youtube, @image, @cuisine, @categorie)"
    );

    return res.status(201).json({
      success: true,
      message: "Plat ajouté avec succès !",
    });

  } catch (err) {
    console.error("Erreur lors de l'ajout du plat :", err);
    res.status(500).json({
      success: false,
      error: "Erreur lors de l'ajout du plat.",
    });
  }
};

export { addDish };
