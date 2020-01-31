const mongoose = require('mongoose')
// const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const usuarioScheme = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minLength: 2
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}, { collection: 'usuarios' })

usuarioScheme.pre('save', async function (next) {
  // Hash the password before saving the user model
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

usuarioScheme.methods.generateAuthToken = async function() {
  // Generate an auth token for the user
  const user = this
  const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
  user.tokens = user.tokens.concat({token})
  await user.save()
  return token
}

usuarioScheme.statics.findByCredentials = async (username, password) => {
  // Search for a user by email and password.
  const user = await Usuario.findOne({ username })
  if (!user) {
    throw new Error('Invalid login credentials')
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
    throw new Error('Invalid login credentials')
  }
  return user


  // Usuario.findOne({ username })
  //   .then((user) => {
  //     if (!user) {
  //       throw new Error({ error: 'Invalid login credentials' })
  //     }
  //     bcrypt.compare(password, user.password)
  //       .then((isPasswordMatch) => {
  //         if (!isPasswordMatch) {
  //           throw new Error({ error: 'Invalid login credentials' })
  //         }
  //       })
  //     return user
  //   })
}

const Usuario = mongoose.model('Usuario', usuarioScheme)

module.exports = Usuario
