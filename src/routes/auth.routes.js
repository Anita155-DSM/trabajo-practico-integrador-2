import { register, login, logout } from "../controllers/auth.controllers.js";
import Router from "express";

const routerAuth = Router();

routerAuth.post('/register', register);
routerAuth.post('/login', login);
routerAuth.post('/logout', logout);

export default routerAuth;
