import { Router } from "express";
import { getAllUsers, getUserByID, createUser, updateUser, deleteUser } from "../controllers/user.controllers.js";

const routerUser = Router();

routerUser.get('/users', getAllUsers);
routerUser.get('/users/:id', getUserByID);
routerUser.post('/users', createUser);
routerUser.put('/users/:id', updateUser);
routerUser.delete('/users/:id', deleteUser);

export default routerUser;