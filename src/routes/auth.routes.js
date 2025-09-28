import { register, login, logout, profile } from "../controllers/auth.controllers.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import validateCreateUser from "../middlewares/validations/user.validator.js";

import Router from "express";

const routerAuth = Router();

routerAuth.post('/register', validateCreateUser, register);
routerAuth.post('/login', login); 
routerAuth.post('/logout', logout);
//profile
routerAuth.get('/profile', authMiddleware, profile);

export default routerAuth;
