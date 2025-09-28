import { body, param } from 'express-validator';
import commentModel from '../../models/comment.models.js';
import articleModel from '../../models/article.models.js';

export const createCommentValidator = [
    body('content')
        .notEmpty()
        .withMessage("el contenido debe ser obligatorio")
        .isLength({ min: 5, max: 500 })
        .withMessage('El contenido del comentario debe tener entre 5 y 500 caracteres'),
    body('author')
        .custom((value, { req }) => { //author: ObjectId válido que debe coincidir con usuario autenticado (excepto admin) | del tp
            if (!mongoose.Types.ObjectId.isValid(value)) { //esto dice que
                throw new Error("El ID de autor no es valido, debe ser un objectId válido");
            }
            if (req.user.role !== "admin" && value !== req.user.id) { //el author debe ser admin o debe ser el usuario autenticado
                throw new Error("No tienes permiso para asignar este autor");
            }
        }),
    body('article')
        .custom( async (value, { req }) => { //async porque primero debe buscar en la base de datos q exista
            if (!mongoose.Types.ObjectId.isValid(value)) { 
                throw new Error("El ID de autor no es valido, debe ser un objectId válido");
            }
            const articleExisting = await articleModel.findById(value);
            if (!articleExisting) {
                throw new Error("El artículo al que intentas asociar el comentario no existe");
            }
            return true
        })
]