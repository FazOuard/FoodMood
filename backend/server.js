import express from 'express';
import cors from 'cors';
import plat from './routers/plat.js'

import platsIngRoutes from './routers/platsIngRoutes.js';
import router from "./routers/auth.js";
import ingPlatRoutes from "./routers/ingPlatRoutes.js";
import routerr from "./routers/ajouter.js";
import userPreferences from "./routers/userPreferenceRouters.js"
import IngGroupPlatRoutes from "./routers/IngGroupPlatRoutes.js"
import userRoutes from "./routers/userRoutes.js"
import historiqueRouter from "./routers/historiqueRouter.js"

import userwithpreferences from "./routers/userAdminRouter.js"
import  validationRouter from "./routers/validationRouter.js"
import ingr from "./routers/ingredient.js"

import ingredientsRouters from "./routers/ingredientsRoutes.js"
import likedDishesRoutes from "./routers/likedDishesRoutes.js"
import ingPlatAdmin from "./routers/IngPlatAdminRouter.js"

const app = express();
app.use(cors()); 
app.use(express.json());
app.use('/data', plat);
app.use('/ingredients', ingr);
app.use('/ingredients2', ingredientsRouters);
app.use('/platsIng', platsIngRoutes);
app.use('/platIng', ingPlatRoutes);
app.use('/addDish', ingPlatRoutes);
app.use('/userPreference', userPreferences);
app.use('/likedDishes', likedDishesRoutes)
app.use('/IngGroupPlat', IngGroupPlatRoutes);
app.use('/ingplatAdmin',ingPlatAdmin)
app.use("/api/auth", router);
app.use("/api/ajouter", routerr);
app.use("/users", userRoutes)
app.use("/historique", historiqueRouter);
app.use("/userWithPreferences",userwithpreferences);
app.use("/validation",validationRouter)

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
