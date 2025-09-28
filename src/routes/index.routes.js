import { Router } from "express";
import routerUser from "./user.routes.js";
import routerArticle from "./article.routes.js";
import routerTag from "./tag.routes.js";
import { routerComment } from "./comment.routes.js";
import routerAuth from "./auth.routes.js";

const routes = Router();

routes.use(routerUser);
routes.use(routerArticle);
routes.use(routerTag);
routes.use(routerComment);
routes.use('/auth', routerAuth);

export default routes;