const response = function(res, status, code, message) {
  res.status(status).json({
    code: code,
    message: message
  })
}

class Status {
  static ok(res, message) {
    response(res, 200, 0, message)
    // res.status(200).json({
    //   code: 0,
    //   message: message
    // })
  }

  static created(res, message) {
    res.status(201).json({
      code: 0,
      message: message
    })
  }

  static badRequest(res, message) {
    res.status(400).json({
      code: 10,
      message: message
    })
  }

  static unauthorized(res, message) {
    res.status(401).json({
      code: 11,
      message: message
    })
  }

  static notFound(res) {
    res.status(404).json({
      code: 12,
      message: "El recurso no fue encontrado"
    })
  }

  static internalServerError(res) {
    res.status(500).json({
      code: 20,
      message: "Ocurrió un error con un módulo interno"
    })
  }
}

module.exports = Status