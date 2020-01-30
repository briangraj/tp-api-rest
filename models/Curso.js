const mongoose = require('mongoose');

const Alumno = require('./schemas/Alumno');

const Curso = new mongoose.Schema({
  anioDictado: { type: Number },
  duracion: { type: Number },
  tema: { type: String },
  alumnos: { type: [Alumno] }
}, { collection: 'cursos' });

module.exports = mongoose.model('Curso', Curso);
