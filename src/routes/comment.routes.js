import { createComment, getAllComments, updateComment, deleteComment } from "../controllers/comment.controllers.js";
import ownerOrAdminMiddleware from "../middlewares/authOwner.Middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createCommentValidator } from "../middlewares/validations/comment.validator.js";
import { Router } from "express";

export const routerComment = Router();

routerComment.get('/comments/my', authMiddleware , getAllComments)
routerComment.get('/comments/article/:articleId', authMiddleware, getAllComments)
routerComment.post('/comments', authMiddleware, createCommentValidator, createComment)
routerComment.put('/comments/:id', authMiddleware, ownerOrAdminMiddleware, updateComment)
routerComment.delete('/comments/:id', authMiddleware, ownerOrAdminMiddleware, deleteComment)
