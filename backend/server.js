import express from 'express';
import cors from 'cors';
import plat from './routers/plat.js'
import ingredientsRoutes from './routers/ingredientsRoutes.js';
import platsIngRoutes from './routers/platsIngRoutes.js';
import router from "./routers/auth.js";
import ingPlatRoutes from "./routers/ingPlatRoutes.js";
import routerr from "./routers/ajouter.js";
import userPreferences from "./routers/userPreferenceRouters.js"
import IngGroupPlatRoutes from "./routers/IngGroupPlatRoutes.js"
import userRoutes from "./routers/userRoutes.js"


const app = express();
app.use(cors()); 
app.use(express.json());
app.use('/data', plat);
app.use('/ingredients', ingredientsRoutes);
app.use('/platsIng', platsIngRoutes);
app.use('/platIng', ingPlatRoutes);
app.use('/addDish', ingPlatRoutes);
app.use('/userPreference', userPreferences);

app.use('/IngGroupPlat', IngGroupPlatRoutes);

app.use("/api/auth", router);
app.use("/api/ajouter", routerr);

app.use("/users", userRoutes)

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
