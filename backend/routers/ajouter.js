import express from 'express';
import { addDish } from '../controllers/ajouterPlat.js';

const routerr = express.Router();

routerr.post("/addDish", addDish);


export default routerr; 