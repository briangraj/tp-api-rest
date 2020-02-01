const usuariosRouter = require('express').Router()

const { postUsuario, postLogin, getMiUsuario, postLogout, postLogoutAll } = require('./usuariosController');
const auth = require('./usuariosValidator');

usuariosRouter.post('/', postUsuario)
usuariosRouter.post('/login', postLogin)

usuariosRouter.get('/me', auth, getMiUsuario)
usuariosRouter.post('/me/logout', auth, postLogout)
usuariosRouter.post('/me/logoutall', auth, postLogoutAll)

module.exports = usuariosRouter