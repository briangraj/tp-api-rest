const cursosRouter = require('express').Router();

const { getCursos/*, getFactura, postFactura, patchFactura, deleteFactura*/ } = require('./cursosController');
// const { postValidators } = require('./facturasValidators');
// const { getCliente, patchCliente } = require('../clienteCRUD/clienteController');
// const { getItems, postItem, deleteItems } = require('../itemCRUD/itemController');

cursosRouter.get('/', getCursos);
// cursosRouter.post('/', postValidators, postFactura);

// cursosRouter.get('/:id', getFactura);
// cursosRouter.patch('/:id', patchFactura);
// cursosRouter.delete('/:id', deleteFactura);

// cursosRouter.get('/:id/cliente', getCliente);
// cursosRouter.patch('/:id/cliente', patchCliente);

// cursosRouter.get('/:id/items', getItems);
// cursosRouter.post('/:id/items', postItem);
// cursosRouter.delete('/:id/items', deleteItems);

module.exports = cursosRouter;
