import express from 'express';

import { deleteUsersWithPreferences, getUsersWithPreferences } from '../controllers/userAdminController.js';


const userPreferences = express.Router();

// Route racine pour les préférences utilisateur
userPreferences.get('/', getUsersWithPreferences);
userPreferences.delete('/:id',deleteUsersWithPreferences)

export default userPreferences;