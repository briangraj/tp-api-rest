const getAlumnos = (req, res, next) => {
  res.status(200).json({
    code: 0,
    message: req.curso.alumnos
  });
};

  module.exports = { getAlumnos };
