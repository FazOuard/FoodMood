import express from 'express';
import { getPlatIngredients } from '../controllers/ingPlatController.js';

const router = express.Router();

router.get('/:idPlat', getPlatIngredients);

export default router;