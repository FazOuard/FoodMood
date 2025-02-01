import express from 'express';
 import { deleteValidation, getValidation } from '../controllers/validationController.js';

const userPreferences = express.Router();

// Route racine pour les préférences utilisateur
userPreferences.get('/', getValidation);
userPreferences.delete('/:id',deleteValidation)


export default userPreferences;
