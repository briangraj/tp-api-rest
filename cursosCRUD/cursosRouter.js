const cursosRouter = require('express').Router();

const { getCursos, getCurso, findCurso, postCurso, deleteCurso, getAlumnoDestacado } = require('./cursosController');
const { getAlumnos } = require('../alumnoCRUD/alumnoController');

cursosRouter.get('/', getCursos);
cursosRouter.post('/', postCurso);

cursosRouter.get('/:id', findCurso, getCurso);
cursosRouter.delete('/:id', deleteCurso);

cursosRouter.get('/:id/alumnos', findCurso, getAlumnos);
cursosRouter.get('/:id/alumno-destacado', getAlumnoDestacado);

module.exports = cursosRouter;
