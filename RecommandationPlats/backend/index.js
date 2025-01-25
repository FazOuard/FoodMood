import express from 'express';
import { poolPromise } from "./config/db.js";
import router from "./routes/auth.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json()); 

app.use("/api/auth", router);

// Connexion à la base de données
poolPromise.then(pool => {
    console.log('Connexion à la base de données réussie');
  })
  .catch(err => {
    console.error('Erreur de connexion à la base de données', err);
  });

const PORT = 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
