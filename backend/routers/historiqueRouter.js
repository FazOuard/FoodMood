import express from 'express';
import { addHistorique,deleteHistorique ,getHistoriqueID} from "../controllers/historiqueController.js";

const historiqueRouter = express.Router();
historiqueRouter.get('/',getHistoriqueID);
historiqueRouter.post('/', addHistorique);

historiqueRouter.delete('/:user_id/:plat', deleteHistorique);
export default historiqueRouter;