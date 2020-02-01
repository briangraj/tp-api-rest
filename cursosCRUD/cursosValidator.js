const { check } = require('express-validator');

const getValidators = [
    check('duracion').optional().isNumeric().withMessage("El campo duracion debe ser numérico"),
    check('anioDictado').optional().isNumeric().withMessage("El campo anioDictado debe ser numérico")
];

module.exports = { getValidators };
