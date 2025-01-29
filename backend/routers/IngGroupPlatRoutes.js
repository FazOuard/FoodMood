import express from 'express';
import { getIngGroupPlat } from '../controllers/IngGroupPlats.js';

const router = express.Router();

router.post('/', getIngGroupPlat); 

export default router;