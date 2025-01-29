import express from 'express';
import { getUsersPreferences } from "../controllers/userPreferencesController.js";
 

const userPreferences = express.Router();

// Route racine pour les préférences utilisateur
userPreferences.get('/', getUsersPreferences);
userPreferences.delete('/:id', deleteUser);

export default userPreferences;
