import { Router } from "express";
import { getAllArticles, getArticleByID, createArticle, updateArticle, deleteArticle } from "../controllers/article.controllers.js";

const routerArticle = Router();

routerArticle.get('/articles', getAllArticles);
routerArticle.get('/articles/:id', getArticleByID);
routerArticle.post('/articles', createArticle);
routerArticle.put('/articles/:id', updateArticle);
routerArticle.delete('/articles/:id', deleteArticle);

export default routerArticle;