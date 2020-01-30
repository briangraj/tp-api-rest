const cursosRouter = require('express').Router();

const { getCursos, getCurso, findCurso, postCurso, deleteCurso/*, patchFactura*/ } = require('./cursosController');
// const { postValidators } = require('./facturasValidators');
// const { getCliente, patchCliente } = require('../clienteCRUD/clienteController');
const { getAlumnos/*, postItem, deleteItems*/ } = require('../alumnoCRUD/alumnoController');

cursosRouter.get('/', getCursos);
cursosRouter.post('/', postCurso);

cursosRouter.get('/:id', findCurso, getCurso);
// cursosRouter.patch('/:id', patchFactura);
cursosRouter.delete('/:id', deleteCurso);

// cursosRouter.get('/:id/cliente', getCliente);
// cursosRouter.patch('/:id/cliente', patchCliente);

cursosRouter.get('/:id/alumnos', findCurso, getAlumnos);
// cursosRouter.post('/:id/items', postItem);
// cursosRouter.delete('/:id/items', deleteItems);

module.exports = cursosRouter;
