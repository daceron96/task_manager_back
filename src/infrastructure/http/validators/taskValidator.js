import {body} from 'express-validator';

export const createTaskValidator = [

  body('title')
    .trim()
    .notEmpty()
    .withMessage('El título es requerido')
    .isLength({min:2 ,max: 100})
    .withMessage('El título debe tener entre 2 y 100 caracteres'),
  
  body('description')
    .optional()
    .trim()
    .isLength({max: 500})
    .withMessage('La descripción debe tener menos de 500 caracteres')
];
