import authMiddleware from "../middlewares/auth.middleware.js";
import ownerOrAdminMiddleware from "../middlewares/authOwner.Middleware.js"
import { Router } from "express";
import validateCreateArticle from "../middlewares/validations/article.validator.js";
import { getAllArticles, getArticleByID, createArticle, updateArticle, deleteArticle } from "../controllers/article.controllers.js";

const routerArticle = Router();

routerArticle.get('/articles', authMiddleware, getAllArticles);
routerArticle.get('/articles/:id', authMiddleware, getArticleByID);
routerArticle.put('/articles/:id', authMiddleware, ownerOrAdminMiddleware, updateArticle);
routerArticle.post('/articles', authMiddleware, validateCreateArticle, createArticle);
routerArticle.delete('/articles/:id', authMiddleware, ownerOrAdminMiddleware, deleteArticle);

export default routerArticle;