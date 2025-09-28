//express-validator usamos para las validaciones
import { body } from "express-validator";
import userModel from "../../models/user.models.js";
import { validator } from "../validator.js";
import isURL from "validator/lib/isURL.js";

//validator para crear usuario
export const validateCreateUser = [
    //user validaciones
    body("username")
    .isLength({ min: 3, max: 20 })
    .withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres")
    .isAlphanumeric()
    .withMessage("El nombre de usuario debe ser alfanumerico"),
    body("email")
    .isEmail()
    .withMessage("El email debe ser valido"),
    body("password")
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe tener al menos una letra mayuscula")
    .matches(/[a-z]/)
    .withMessage("La contraseña debe tener al menos una letra minuscula")
    .matches(/[0-9]/)
    .withMessage("La contraseña debe tener al menos un numero"),
    body("role")
    .isIn([ 'user', 'admin' ]) //solo permite que los valores dentro del array sean validos
    .withMessage("El rol permido es: user o admin"),
    //profile validaciones
    body("profile.firstName")
    .isLength({min: 2, max: 50})
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .matches(/^[A-Za-z]+$/)
    .withMessage("El nombre solo puede contener letras"),
    body("profile.lastName")
    .isLength({min: 2, max: 50})
    .withMessage("El apellido debe tener entre 2 y 50 caracteres"),
    body("profile.biography")
    .optional()  //agregue el opcional para los campos que lo requerian en el tp
    .isLength({max: 500})
    .withMessage("La biografia no debe superar los 500 caracteres"),
    body("profile.avatarUrl")
    .optional()
    .isURL()
    .withMessage("La URL del avatar no es valida"),
    body("profile.birthDate")
    .optional()
    .isDate()
    .withMessage("La fecha de nacimiento no es valida")
]
