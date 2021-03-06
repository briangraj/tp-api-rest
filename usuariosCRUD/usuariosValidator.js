const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuario')
const Status = require('../utils/Status')

const auth = async(req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, process.env.JWT_KEY)
    const user = await Usuario.findOne({ _id: data._id, 'tokens.token': token })
    if (!user) {
      throw new Error()
    }
    req.user = user
    req.token = token
    next()
  } catch (error) {
    Status.unauthorized(res, 'No tiene permisos para ver el contenido')
  }
}

module.exports = auth
