const Usuario = require('../models/Usuario');
const Status = require('../utils/Status');

const postUsuario = (req, res, next) => {
  // Create a new user
  const body = req.body

  const newUsuario = new Usuario({
    username: body.username,
    password: body.password,
    tokens: body.tokens
  });

  newUsuario.save()
    .then(created => {
      newUsuario.generateAuthToken()
        .then(() => { Status.created(res, created) })
    })
    .catch(next)
}

const postLogin = (req, res) => {
  //Login a registered user
  const { username, password } = req.body
  Usuario.findByCredentials(username, password)
    .then(user => {
      user.generateAuthToken()
        .then(token => {
          Status.ok(res, {
            usuario: user,
            token: token
          })
        })
    })
    .catch(error => {
      console.log(error)
      Status.unauthorized(res, "Credenciales no validas")
    })
}

const getMiUsuario = (req, res) => {
  Status.ok(res, req.user)
}

const postLogout = (req, res, next) => {
  req.user.tokens = req.user.tokens.filter((token) => {
    return token.token != req.token
  })
  req.user.save()
    .then(() => { Status.ok(res, "El logout de esta sesion se completo correctamente")})
    .catch(next)
}

const postLogoutAll = (req, res, next) => {
  req.user.tokens.splice(0, req.user.tokens.length)
  req.user.save()
    .then(() => Status.ok(res, "El logout de todas las sesiones se completo correctamente"))
    .catch(next)
}

module.exports = { postUsuario, postLogin, getMiUsuario, postLogout, postLogoutAll }
