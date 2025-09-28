import { Router } from "express";
import authAdminMiddleware from "../middlewares/authAdmin.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { getAllUsers, getUserByID, updateUser, deleteUser } from "../controllers/user.controllers.js";

const routerUser = Router();
//agregamos los middlewares a las rutas (solo admin segun el tp)
routerUser.get('/users', authMiddleware, authAdminMiddleware, getAllUsers);
routerUser.get('/users/:id', authMiddleware, authAdminMiddleware, getUserByID);
routerUser.put('/users/:id', authMiddleware, authAdminMiddleware, updateUser);
routerUser.delete('/users/:id', authMiddleware, authAdminMiddleware, deleteUser);

export default routerUser;