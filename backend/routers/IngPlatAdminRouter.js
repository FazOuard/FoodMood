import express from 'express';
import { addDataIngredientsPlat } from '../controllers/IngPlatAdminController.js';


const router = express.Router();
router.post('/add', addDataIngredientsPlat);
export default router;