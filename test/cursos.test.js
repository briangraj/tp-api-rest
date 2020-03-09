require('dotenv').config();
const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);
const mongoose = require('mongoose');
const Usuario = require('../models/Usuario');

const body = {
  'Accept': 'application/json',
  'Authorization': process.env.TOKEN
};
const databaseName = 'test'

beforeAll(async () => {
  const url = `mongodb://localhost:27017/${databaseName}`
  await mongoose.connect(url, { useNewUrlParser: true })
})

afterEach(async () => {
  await Usuario.deleteMany()
})

describe('Test cursos', function() {
  describe('Al buscar todos los cursos', function() {
    it('deberia retornar 200 y message deberia ser un array', async done => {
      const response = await request.get('/cursos').set(body);

      expect(response.status).toBe(200);
      expect(response.body.message).toBeInstanceOf(Array);
      done()
    })
  })
});

it('Should save user to database', async done => {
  const res = await request.post('/usuarios')
    .send({
      username: 'Zell',
      password: 'testing@gmail.com'
    })

  const user = await Usuario.findOne({ username: 'Zell' })
  expect(user.username).toBeTruthy()
  expect(user.password).toBeTruthy()

  done()
})
