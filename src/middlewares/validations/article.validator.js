import { body, param } from 'express-validator';
import articleModel from '../../models/article.models.js';
import mongoose from 'mongoose'

const validateCreateArticle = [
    body("title")
    .notEmpty()
    .withMessage("el titulo debe ser obligatorio")
    .isLength({min: 3, max: 200})
    .withMessage("el titulo debe tener entre 3 y 200 caracteres"),
    body("content")
    .notEmpty()
    .withMessage("el contenido debe ser obligatorio")
    .isLength({min: 50})
    .withMessage("el contenido debe ser de minimo 50 caracteres"),
    body("excerpt")
    .optional()
    .isLength({max: 500})
    .withMessage("el extracto debe tener máximo 500 caracteres"),
    body("status")
    .isIn(['published', 'archived'])
    .withMessage("los estados permitidos son: publicado o archivado"),
    body("author")
    .notEmpty()
    .withMessage("el autor es obligatorio")
    .custom((value, { req }) => { //author: ObjectId válido que debe coincidir con usuario autenticado (excepto admin) | del tp
        if (!mongoose.Types.ObjectId.isValid(value)) { 
            throw new Error("El ID de autor no es valido, debe ser un objectId válido");
        }
        if (req.user.role !== "admin" && value !== req.user.id) { //el author debe ser admin o debe ser el usuario autenticado
            throw new Error("No tienes permiso para asignar este autor");
        }
        return true;
    })
]

export default validateCreateArticle