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
}

module.exports = Status