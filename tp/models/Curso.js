const mongoose = require('mongoose');

const Curso = new mongoose.Schema({
  anioDictado: Number,
  duracion: Number,
  tema: String,
  alumnos: [{
    nombre: String,
    apellido: String,
    dni: Number,
    direccion: String,
    nota: Number
  }]
});

module.exports = mongoose.model('Curso', Curso);
