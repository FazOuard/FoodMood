import express from 'express';
import { getLikedDishes } from '../controllers/likedDishesController.js';

const router = express.Router();

router.get('/', getLikedDishes);

export default router;
