// backend/routes/ingredientRoutes.js
import express from 'express';
import { getIngredients, addIngredient, deleteIngredient, updateIngredient } from '../controllers/ingredientsController.js';

const ingr = express.Router();

ingr.get('/ingredients', getIngredients);  // Récupérer tous les ingrédients
ingr.post('/ingredients', addIngredient);  // Ajouter un ingrédient
ingr.delete('/ingredients/:id', deleteIngredient);  // Supprimer un ingrédient
ingr.put('/ingredients/:id', updateIngredient);  // Mettre à jour un ingrédient

export default ingr;
