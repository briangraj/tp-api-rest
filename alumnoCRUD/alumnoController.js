const ok = require('../utils/Status').ok

const getAlumnos = (req, res, next) => {
  ok(res, req.curso.alumnos)
};

  module.exports = { getAlumnos };
