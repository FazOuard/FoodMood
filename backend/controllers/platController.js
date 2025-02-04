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


export const getLastId = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT MAX(id) AS lastId FROM plat');
    return result.recordset[0].lastId || 0; // Si pas d'ID, retourner 0
  } catch (err) {
    console.error('Erreur lors de la récupération du dernier ID:', err.message);
    throw err;
  }
};


export const addData = async (req, res) => {
  const { Titre, Recette, Duree, Ingredients, Calories, Proteines, Lipides, Glucides, Youtube, Image, Cuisine, Cathegorie } = req.body;

  try {
    // Récupérer le dernier ID et l'incrémenter de 1
    const lastId = await getLastId();
    const newId = lastId + 1; // Incrémentation de l'ID

    const pool = await poolPromise;
    await pool
      .request()
      .input('id', newId)
      .input('Titre', Titre)
      .input('Recette', Recette)
      .input('Duree', Duree)
      .input('Ingredients', Ingredients)
      .input('Calories', Calories)
      .input('Proteines', Proteines)
      .input('Lipides', Lipides)
      .input('Glucides', Glucides)
      .input('Youtube', Youtube)
      .input('Image', Image)
      .input('Cuisine', Cuisine)
      .input('Cathegorie', Cathegorie)
      .query(`
        INSERT INTO plat (id, Titre, Recette, Duree, Ingredients, Calories, Proteines, Lipides, Glucides, Youtube, Image, Cuisine, Cathegorie)
        VALUES (@id, @Titre, @Recette, @Duree, @Ingredients, @Calories, @Proteines, @Lipides, @Glucides, @Youtube, @Image, @Cuisine, @Cathegorie)
      `);

    res.status(201).json({ message: "Plat ajouté avec succès" });
  } catch (err) {
    res.status(500).send({ message: "Erreur lors de l'ajout du plat", error: err.message });
  }
};



export const updateData = async (req, res) => {
  const { id } = req.params;
  const { Titre, Recette, Duree, Ingredients, Calories, Proteines, Lipides, Glucides, Youtube, Image, Cuisine, Cathegorie } = req.body;
  
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input('Titre', Titre)
      .input('Recette', Recette)
      .input('Duree', Duree)
      .input('Ingredients', Ingredients)
      .input('Calories', Calories)
      .input('Proteines', Proteines)
      .input('Lipides', Lipides)
      .input('Glucides', Glucides)
      .input('Youtube', Youtube)
      .input('Image', Image)
      .input('Cuisine', Cuisine)
      .input('Cathegorie', Cathegorie)
      .input('id', id)
      .query(`
        UPDATE plat
        SET 
          Titre = @Titre,
          Recette = @Recette,
          Duree = @Duree,
          Ingredients = @Ingredients,
          Calories = @Calories,
          Proteines = @Proteines,
          Lipides = @Lipides,
          Glucides = @Glucides,
          Youtube = @Youtube,
          Image = @Image,
          Cuisine = @Cuisine,
          Cathegorie = @Cathegorie
        WHERE id = @id
      `);
    
    res.json({
      message: 'Plat mis à jour avec succès',
      plat: { Titre, Recette, Duree, Ingredients, Calories, Proteines, Lipides, Glucides, Youtube, Image, Cuisine, Cathegorie }
    });
    
  } catch (err) {
    res.status(500).send({
      message: 'Erreur lors de la mise à jour du plat',
      error: err.message
    });
  }
}


export const deleteData = async (req, res) => {
  const { id } = req.params;  
  
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input('id', id)
      .query(`
        DELETE FROM plat WHERE id = @id
      `);
    
    res.status(200).json({ message: "Plat supprimé avec succès" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};




export const addDataInPlatInIngredient = async (req, res) => {
  const { Titre, Recette, Duree, Ingredients, Calories, Proteines, Lipides, Glucides, Youtube, Image, Cuisine, Cathegorie } = req.body;

  try {
    // Récupérer le dernier ID et l'incrémenter de 1
    const lastId = await getLastId();
    const newId = lastId + 1; // Incrémentation de l'ID

    const pool = await poolPromise;
    await pool
      .request()
      .input('id', newId)
      .input('Titre', Titre)
      .input('Recette', Recette)
      .input('Duree', Duree)
      .input('Ingredients', Ingredients)
      .input('Calories', Calories)
      .input('Proteines', Proteines)
      .input('Lipides', Lipides)
      .input('Glucides', Glucides)
      .input('Youtube', Youtube)
      .input('Image', Image)
      .input('Cuisine', Cuisine)
      .input('Cathegorie', Cathegorie)
      .query(`
        INSERT INTO plat (id, Titre, Recette, Duree, Ingredients, Calories, Proteines, Lipides, Glucides, Youtube, Image, Cuisine, Cathegorie)
        VALUES (@id, @Titre, @Recette, @Duree, @Ingredients, @Calories, @Proteines, @Lipides, @Glucides, @Youtube, @Image, @Cuisine, @Cathegorie)
      `);

    res.status(201).json({ message: "Plat ajouté avec succès" });
  } catch (err) {
    res.status(500).send({ message: "Erreur lors de l'ajout du plat", error: err.message });
  }
};