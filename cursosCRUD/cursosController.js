const Curso = require('../models/Curso');
const mongoose = require('mongoose');

// const { validationResult } = require('express-validator');

const getCursos = (req, res, next) => {
  const query = req.query || {};

  Curso.find(query).limit(10)
    .then(cursos => {
      res.status(200).json({
        code: 0,
        message: cursos
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        code: 20,
        message: "Ocurrió un error con un módulo interno"
      });
    })
};

const getCurso = (req, res, next) => {
  res.status(200).json({
    code: 0,
    message: req.curso
  });
};

const findCurso = (req, res, next) => {
  const id = req.params.id;

  Curso.findById(id)
    .then(curso => {
      if (!curso) {
        res.status(404).json({
          code: 12,
          message: "El recurso no fue encontrado"
        })
      } else {
        req.curso = curso;

        next();
      }
    })
    .catch(next)
    //   err => {
    //   console.log(err);
    //   res.status(500).json({
    //     code: 20,
    //     message: "Ocurrió un error con un módulo interno"
    //   });
    // })
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
    .then(created => {
      res.status(201).json({
        code: 0,
        message: created
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        code: 20,
        message: "Ocurrió un error con un módulo interno"
      });
    })
};

const deleteCurso = (req, res, next) => {
  const id = req.params.id;

  Curso.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({
        code: 0,
        message: "Curso eliminado correctamente"
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        code: 20,
        message: "Ocurrió un error con un módulo interno"
      });
  })
};

const getAlumnoDestacado = (req, res, next) => {
  const id = req.params.id;

  Curso.aggregate([
    { "$match": { "_id": new mongoose.mongo.ObjectId(id) } },
    { "$unwind": "$alumnos" },
    { "$sort": { "alumnos.nota": -1 } },
    { "$limit": 1 },
    { "$replaceRoot": { "newRoot": "$alumnos" } }
  ]).then(resultado => {
    if(resultado.length === 0) {
      res.status(404).json({
        code: 12,
        message: "El recurso no fue encontrado"
      })
    } else {
      res.status(200).json({
        code: 0,
        message: resultado[0]
      })
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      code: 20,
      message: "Ocurrió un error con un módulo interno"
    });
  })
}

module.exports = { getCursos, getCurso, findCurso, postCurso, deleteCurso, getAlumnoDestacado };
