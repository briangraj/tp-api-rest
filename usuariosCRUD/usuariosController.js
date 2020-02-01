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
          res.json({
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

module.exports = { postUsuario, postLogin }
