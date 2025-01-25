import express from 'express';
import cors from 'cors';
import { poolPromise } from './dbConfig.js';
import plat from './routers/plat.js'
import ingredientsRoutes from './routers/ingredientsRoutes.js';
import platsIngRoutes from './routers/platsIngRoutes.js';
import router from "./routers/auth.js";

const app = express();
app.use(cors()); 
app.use(express.json());

app.use('/data', plat);
app.use('/ingredients', ingredientsRoutes);
app.use('/platsIng', platsIngRoutes);

app.use("/api/auth", router);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
