const getAlumnos = (req, res, next) => {
  let message
  if (req.query.destacado === "s") {
    message = req.curso.alumnos.sort((alumno1, alumno2) => alumno2.nota - alumno1.nota)[0]
  } else {
    message = req.curso.alumnos
  }

  res.status(200).json({
    code: 0,
    message: message
  });
};

  module.exports = { getAlumnos };
