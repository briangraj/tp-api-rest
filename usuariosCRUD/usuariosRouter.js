const usuariosRouter = require('express').Router()

const { postUsuario, postLogin } = require('./usuariosController');

usuariosRouter.post('/', postUsuario)

usuariosRouter.post('/login', postLogin)

module.exports = usuariosRouter