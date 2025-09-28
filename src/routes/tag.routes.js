import authMiddleware from "../middlewares/auth.middleware.js";
import authOwnerMiddleware from "../middlewares/authOwner.Middleware.js";
import authAdminMiddleware from "../middlewares/authAdmin.middleware.js";
import { createTag, getAllTags, getTagByID, updateTag, deleteTag } from "../controllers/tag.controllers.js";
import { Router } from "express";

const routerTag = Router();

routerTag.post('/tags', authMiddleware, authAdminMiddleware, createTag);
routerTag.get('/tags', authMiddleware, authOwnerMiddleware, getAllTags);
routerTag.get('/tags/:id', authMiddleware, authOwnerMiddleware, getTagByID);
routerTag.put('/tags/:id', authMiddleware, authAdminMiddleware, updateTag);
routerTag.delete('/tags/:id', authMiddleware, authAdminMiddleware, deleteTag);

export default routerTag;