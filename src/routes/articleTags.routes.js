import { Router } from "express";
import authMiddleware from "./auth.middleware.js";
import { ownerOrAdminMiddleware } from "../middlewares/authOwner.Middleware.js";
import { createArticleTag, deleteArticleTag }from "../controllers/articleTags.controllers.js";

const routerArticleTags = Router();

routerArticleTags.post('/articles/:articleId/tags/:tagId', authMiddleware, ownerOrAdminMiddleware, createArticleTag)
routerArticleTags.delete('/articles/:articleId/tags/:tagId', authMiddleware, ownerOrAdminMiddleware, deleteArticleTag)


/*RELACION N:M

POST /api/articles/:articleId/tags/:tagId -> Agregar etiqueta a artículo. (solo autor
o admin)
DELETE /api/articles/:articleId/tags/:tagId -> Remover etiqueta de artículo. (solo
autor o admin)

*/