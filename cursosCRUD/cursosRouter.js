const cursosRouter = require('express').Router();
const { getValidators } = require('./cursosValidator');

const { getCursos, getCurso, findCurso, postCurso, deleteCurso, getAlumnoDestacado, patchCursos } = require('./cursosController');
const { getAlumnos } = require('../alumnoCRUD/alumnoController');

const Status = require('../utils/Status');

cursosRouter.get('/', getValidators, getCursos);
cursosRouter.post('/', postCurso);

cursosRouter.get('/:id', findCurso, getCurso);
cursosRouter.delete('/:id', deleteCurso);
cursosRouter.patch('/:id', patchCursos);

cursosRouter.get('/:id/alumnos', findCurso, getAlumnos);
cursosRouter.get('/:id/alumno-destacado', getAlumnoDestacado);

module.exports = cursosRouter;
