import express from 'express';
import { getData } from '../controllers/platController.js';

const router = express.Router();

router.get('/', getData);

export default router;
