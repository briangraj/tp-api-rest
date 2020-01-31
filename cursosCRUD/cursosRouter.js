const cursosRouter = require('express').Router();

const { getCursos, getCurso, findCurso, postCurso, deleteCurso } = require('./cursosController');
const { getAlumnos } = require('../alumnoCRUD/alumnoController');

cursosRouter.get('/', getCursos);
cursosRouter.post('/', postCurso);

cursosRouter.get('/:id', findCurso, getCurso);
cursosRouter.delete('/:id', deleteCurso);

cursosRouter.get('/:id/alumnos', findCurso, getAlumnos);

module.exports = cursosRouter;
