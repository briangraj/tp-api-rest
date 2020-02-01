class Status {
  static ok(res, message) {
    res.status(200).json({
      code: 0,
      message: message
    })
  }

  static created(res, message) {
    res.status(201).json({
      code: 0,
      message: message
    })
  }

  static notFound(res) {
    res.status(404).json({
      code: 12,
      message: "El recurso no fue encontrado"
    })
  }

  static get funcionError() {
    return function(err, req, res, next) {
      console.error(err)
      res.status(500).json({
        code: 20,
        message: "Ocurrió un error con un módulo interno"
      })
    }
  }
}

module.exports = Status