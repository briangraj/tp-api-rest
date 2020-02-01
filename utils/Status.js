const response = function(res, status, code, message) {
  res.status(status).json({
    code: code,
    message: message
  })
}

class Status {
  static ok(res, message) {
    response(res, 200, 0, message)
  }

  static created(res, message) {
    response(res, 201, 0, message)
  }

  static badRequest(res, message) {
    response(res, 400, 10, message)
  }

  static unauthorized(res, message) {
    response(res, 401, 11, message)
  }

  static notFound(res) {
    response(res, 404, 12, "El recurso no fue encontrado")
  }

  static internalServerError(res) {
    response(res, 500, 20, "Ocurrió un error con un módulo interno")
  }
}

module.exports = Status