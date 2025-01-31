import bcrypt from 'bcryptjs';
import { poolPromise } from '../dbConfig.js'; // Utilisation du poolPromise
import { sql } from '../dbConfig.js';


const registerUser = async (req, res) => {
  const { username, password, confirmPassword, genre, age, city, region,
    nationalité, status, poids, taille, Aimer_Plat_marocain,
    type_cuisine, duree_preparation, Vegeterien_question, Allergies,
    Allergie_specification,  type_viande_prefere, Poids_etat,
    Sport_question, sport_pratique, regime_question,
    regime_alimentaire, regime_raison, maladie,
    dejeuner_preference, favoriteDishes, ConsumedDishes, step } = req.body;
    console.log("this is the data in backend: ", req.body)
  // Validation des mots de passe
  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, error: "Les mots de passe ne correspondent pas." });
  }

  try {
    const pool = await poolPromise;
    const request = pool.request();

    // Vérifier si l'utilisateur existe déjà
    request.input("username", sql.VarChar, username);
    const result = await request.query("SELECT * FROM Users WHERE username = @username");

    if (result.recordset.length > 0) {
      return res.status(400).json({ success: false, error: "Cet email est déjà utilisé." });
    }

    // Étape 1 : Validation initiale, mais pas d'insertion dans la base
    if (step === 1) {
      return res.status(200).json({
        success: true,
        message: "Informations validées, passez à l'étape suivante.",
      });
    }

    // Étape 2 : Insérer les données complètes
    if (step === 2) {
      // Hachage du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      const insertUserQuery = 
      `INSERT INTO Users (username, password, age, city, favoriteDishes, type)
      OUTPUT INSERTED.id
      VALUES (@username, @password, @age, @city, @favoriteDishes, 'user')`

      // Insertion dans la base de données
      request.input("password", sql.VarChar, hashedPassword);
      request.input("age", sql.Int, age);
      request.input("city", sql.VarChar, city);
      request.input("favoriteDishes", sql.VarChar, favoriteDishes.join(","));


      // await request.query(
      //   `INSERT INTO Users (username, password, age, city, favoriteDishes, type)
      //   OUTPUT INSERTED.id
      //   VALUES (@username, @password, @age, @city, @favoriteDishes, 'user')"`
      // );

      
      const result = await request.query(insertUserQuery);
      const userId = result.recordset[0].id;
      
      console.log("User inserted successfully. User ID:", userId);

      const insertUserDetailsQuery = `
        INSERT INTO users_preferences (
          user_id, Region, Nationalite, Statut, Poids, Taille, Aimer_Plat_marocain,
          type_cuisine, duree_preparation, Vegeterien_question, Allergies,
          Allergie_specification, type_viande_prefere, Poids_etat,
          Sport_question, sport_pratique, regime_question,
          regime_alimentaire, regime_raison, maladie,
          dejeuner_preference, Plat_consome, age, Genre, Plat_prefere
        )
        VALUES (
          @user_id, @region, @nationalité, @status, @poids, @taille, @Aimer_Plat_marocain,
          @type_cuisine, @duree_preparation, @Vegeterien_question, @Allergies,
          @Allergie_specification, @type_viande_prefere, @Poids_etat,
          @Sport_question, @sport_pratique, @regime_question,
          @regime_alimentaire, @regime_raison, @maladie,
          @dejeuner_preference, @ConsumedDishes, @age, @genre, @PlatPrefere
        );
      `;

      // Add all the remaining inputs
      request.input("user_id", sql.Int, userId);
      request.input("region", sql.VarChar, region);
      request.input("nationalité", sql.VarChar, nationalité);
      request.input("status", sql.VarChar, status);
      request.input("poids", sql.VarChar, poids);
      request.input("taille", sql.VarChar, taille);
      request.input("Aimer_Plat_marocain", sql.VarChar, Aimer_Plat_marocain);
      request.input("type_cuisine", sql.VarChar, type_cuisine);
      request.input("duree_preparation", sql.VarChar, duree_preparation);
      request.input("Vegeterien_question", sql.VarChar, Vegeterien_question);
      request.input("Allergies", sql.VarChar, Allergies);
      request.input("Allergie_specification", sql.VarChar, Allergie_specification);
      request.input("type_viande_prefere", sql.VarChar, type_viande_prefere);
      request.input("Poids_etat", sql.VarChar, Poids_etat);
      request.input("Sport_question", sql.VarChar, Sport_question);
      request.input("sport_pratique", sql.VarChar, sport_pratique);
      request.input("regime_question", sql.VarChar, regime_question);
      request.input("regime_alimentaire", sql.VarChar, regime_alimentaire);
      request.input("regime_raison", sql.VarChar, regime_raison);
      request.input("maladie", sql.VarChar, maladie);
      request.input("genre", sql.VarChar, genre);
      request.input("dejeuner_preference", sql.Int, dejeuner_preference);
      request.input("ConsumedDishes", sql.VarChar, ConsumedDishes.join(","));
      request.input("PlatPrefere", sql.VarChar, favoriteDishes.join(","));

      await request.query(insertUserDetailsQuery);

      return res.status(201).json({
        success: true,
        message: "Utilisateur enregistré avec succès !",
      });
    }

    // Si l'étape n'est pas valide
    return res.status(400).json({
      success: false,
      error: "Étape non valide.",
    });
  } catch (err) {
    console.error("Erreur lors de l'enregistrement :", err);
    res.status(500).json({
      success: false,
      error: "Erreur lors de l'enregistrement de l'utilisateur.",
    });
  }
};



const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Connexion au pool de la base de données
    const pool = await poolPromise;
    const request = pool.request();  // Utilisation de la connexion du pool

    // Exécution de la requête pour vérifier l'utilisateur
    request.input("username", sql.VarChar, username);
    const result = await request.query("SELECT * FROM users WHERE username = @username");

    // Si l'utilisateur n'existe pas
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    // Récupération des informations de l'utilisateur
    const user = result.recordset[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    // Comparaison du mot de passe en clair
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Mot de passe incorrect." });
    }

    // Connexion réussie, on renvoie un message de succès
    res.status(200).json({ 
      message: "Connexion réussie." ,
      id: user.id
    });
    
  } catch (err) {
    console.error('Erreur lors de la connexion:', err);
    res.status(500).json({ error: "Erreur lors de la connexion de l'utilisateur." });
  }
};

export { registerUser, loginUser };
