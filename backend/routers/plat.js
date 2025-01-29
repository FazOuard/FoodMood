import express from 'express';
import { getData,addData, updateData ,deleteData} from '../controllers/platController.js';

const router = express.Router();

router.get('/', getData);

router.post("/add", addData);

router.put("/:id",updateData);

router.delete("/:id", deleteData);


export default router;
