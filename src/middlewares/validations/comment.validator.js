import {body, param} from 'express-validator';
import commentModel from '../../models/comment.models.js';

export const createCommentValidator = [
    body('content')
    .isLength({min: 5, max: 500})
    .withMessage('El contenido del comentario debe tener entre 5 y 500 caracteres')
]

