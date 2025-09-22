//express-validator usamos para las validaciones
import { body } from "express-validator";
import userModel from "../../models/user.models.js";
import { validator } from "../validator.js";
import isURL from "validator/lib/isURL.js";

//validator para crear usuario
export const validateCreateUser = [
    body("username")
    .isLength({ min: 3, max: 20 })
    .withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres"),
    body("email")
    .isEmail()
    .withMessage("El email debe ser valido"),
    //profile validaciones
    body("profile.firstName")
    .isLength({min: 2, max: 50})
    .withMessage("El nombre debe tener entre 2 y 50 caracteres"),
    body("profile.lastName")
    .isLength({min: 2, max: 50})
    .withMessage("El apellido debe tener entre 2 y 50 caracteres"),
    body("profile.biography")
    .isLength({max: 500})
    .withMessage("La biografia no debe superar los 500 caracteres"),
    body("profile.avatarUrl")
    .isURL()
    .withMessage("La URL del avatar no es valida")    
]
