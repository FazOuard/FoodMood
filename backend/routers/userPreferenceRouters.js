import express from 'express';
import { getUsersPreferences } from "../controllers/userPreferencesController.js";
 

const userPreferences = express.Router();

// Route racine pour les préférences utilisateur
userPreferences.get('/', getUsersPreferences);

export default userPreferences;
