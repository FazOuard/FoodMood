import express from 'express';
import { getPlatsIngredients } from '../controllers/platsIngController.js';

const router = express.Router();

router.get('/', getPlatsIngredients);

export default router;
