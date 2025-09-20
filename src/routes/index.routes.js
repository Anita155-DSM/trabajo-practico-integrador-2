import { Router } from "express";
import routerUser from "./user.routes.js";
import routerArticle from "./article.routes.js";
import routerTag from "./tag.routes.js";

const routes = Router();

routes.use('/api', routerUser);
routes.use('/api', routerArticle);
routes.use('/api', routerTag);

export default routes;