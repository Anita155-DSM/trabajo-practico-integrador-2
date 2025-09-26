import { createComment, getAllComments, getCommentByID, updateComment, deleteComment } from "../controllers/comment.controllers.js";
import { createCommentValidator } from "../middlewares/validations/comment.validator.js";
import { Router } from "express";

export const routerComment = Router();

routerComment.get('/comment', getAllComments)
routerComment.get('/comment/:id', getCommentByID)
routerComment.post('/comment', createCommentValidator, createComment)
routerComment.put('/comment/:id', updateComment)
routerComment.delete('/comment/:id', deleteComment)
