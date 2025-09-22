import { body, param } from 'express-validator';
import articleModel from '../../models/article.models.js';

const validateCreateArticle = [
    body("title")
    .isLength({min: 3, max: 200})
    .withMessage("el titulo debe tener entre 3 y 200 caracteres"),
    body("content")
    .isLength({min: 50})
    .withMessage("el contenido debe ser de minimo 50 caracteres"),
    body("excerpt")
    .isLength({max: 500})
    .withMessage("el extracto debe tener máximo 500 caracteres")
]