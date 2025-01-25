import bcrypt from 'bcryptjs'; 
import { poolPromise } from '../config/db.js'; // Utilisation du poolPromise
import { sql } from '../config/db.js';


const registerUser = async (req, res) => {
  const { username, password, confirmPassword, age, city, favoriteDishes, step } = req.body;

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

      // Insertion dans la base de données
      request.input("password", sql.VarChar, hashedPassword);
      request.input("age", sql.Int, age);
      request.input("city", sql.VarChar, city);
      request.input("favoriteDishes", sql.VarChar, favoriteDishes.join(","));


      await request.query(
        "INSERT INTO Users (username, password, age, city, favoriteDishes) VALUES (@username, @password, @age, @city, @favoriteDishes)"
      );

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

    // Comparaison du mot de passe en clair
    if (user.passwd !== password) {
      return res.status(401).json({ error: "Mot de passe incorrect." });
    }

    // Connexion réussie, on renvoie un message de succès
    res.status(200).json({ message: "Connexion réussie." });
    
  } catch (err) {
    console.error('Erreur lors de la connexion:', err);
    res.status(500).json({ error: "Erreur lors de la connexion de l'utilisateur." });
  }
};

export { registerUser, loginUser };
