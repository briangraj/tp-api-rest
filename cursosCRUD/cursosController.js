const mongoose = require('mongoose');
const Curso = require('../models/Curso');
const Status = require('../utils/Status');
const { validationResult } = require('express-validator');

const getCursos = (req, res, next) => {
  const query = req.query || {};
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return Status.badRequest(res, errors.array())
  }

  Curso.find(query).limit(10)
    .then(cursos => Status.ok(res, cursos))
    .catch(next)
};

const getCurso = (req, res, next) => {
  Status.ok(res, req.curso)
};

const findCurso = (req, res, next) => {
  const id = req.params.id;

  Curso.findById(id)
    .then(curso => {
      if (!curso)
        Status.notFound(res)
      else {
        req.curso = curso;
        next();
      }
    })
    .catch(next)
};

const postCurso = (req, res, next) => {
  const body = req.body;

  const newCurso = new Curso({
    anioDictado: body.anioDictado,
    duracion: body.duracion,
    tema: body.tema,
    alumnos: body.alumnos
  });

  newCurso.save()
    .then(created => { Status.created(res, created) })
    .catch(next)
};

const deleteCurso = (req, res, next) => {
  const id = req.params.id;

  Curso.findByIdAndDelete(id)
    .then(() => { Status.ok(res, "Curso eliminado correctamente") })
    .catch(next)
};

const getAlumnoDestacado = (req, res, next) => {
  const id = req.params.id;

  Curso.aggregate()
    .match({ _id: new mongoose.mongo.ObjectId(id) })
    .unwind("$alumnos")
    .sort({ "alumnos.nota": -1 })
    .limit(1)
    .then(resultado => {
      if(resultado.length === 0)
        Status.notFound(res)
      else
        Status.ok(res, resultado[0].alumnos)
    })
    .catch(next)
}

const patchCursos = function(req, res, next) {
  Curso.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(result => { Status.ok(res, result) })
    .catch(next)  
}

module.exports = { getCursos, getCurso, findCurso, postCurso, deleteCurso, getAlumnoDestacado, patchCursos };
