import express from 'express';
import { addHistorique,deleteHistorique } from "../controllers/historiqueController.js";

const historiqueRouter = express.Router();
historiqueRouter.post('/', addHistorique);
historiqueRouter.delete('/:user_id/:plat', deleteHistorique);
export default historiqueRouter;