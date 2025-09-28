import { body, param } from "express-validator";

const createTagValidator = [  //validador para crear tag
    body("name")
    .notEmpty()
    .withMessage("el nombre es obligatorio")
    .isLength({min: 2, max: 30})
    .withMessage("El nombre del tag debe tener entre 2 y 30 caracteres")
    .matches(/^\S+$/) //aca hacemos + y no * porque la idea es que el nombre no venga vacío
    .withMessage("El nombre del tag no debe tener espacios en blanco"),
    body("description")
    .optional() //la descripcion es opcional
    .isLength({max: 200})
    .withMessage("La descripcion no debe superar los 200 caracteres")
];

export default createTagValidator;