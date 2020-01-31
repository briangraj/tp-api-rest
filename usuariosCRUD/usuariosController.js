const Usuario = require('../models/Usuario');

const postUsuario = (req, res) => {
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
        .then(token => {
          res.status(201).json({
            code: 0,
            message: created
          })
        })
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({
        code:20,
        message: "Ocurrió un error con un módulo interno"
      })
    });
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
      res.status(401).json({
        code: 11,
        message: "Fallo el login"
      })
    })
}

module.exports = { postUsuario, postLogin }
