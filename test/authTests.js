require('dotenv').config()
const expect = require('chai').expect,
  supertest = require('supertest'),
  api = supertest('http://localhost:8080');

const body = {
  'Accept': 'application/json',
  'Authorization': process.env.TOKEN
}

describe('Test autenticacion', function() {
  describe('Al intentar acceder a un curso', function() {
    it('deberia retornar 401 cuando no tiene el token', function(done) {
      api.get('/cursos')
        .set('Accept', 'application/json')
        .expect(401, done)
    });

    it('deberia retornar 200 cuando tiene token', function(done) {
      api.get('/cursos')
      .set(body)
      .expect(200, done)
    });
  });

  describe('Al intentar logearse', function() {
    it('deberia retornar 200 cuando las credenciales son correctas', function(done) {
      api.post('/usuarios/login')
        .send({
          username: process.env.USERNAME,
          password: process.env.PASSWORD
        })
        .expect(200, done)
    });
  });

  it('deberia retornar 401 cuando las credenciales no son correctas', function(done) {
    api.post('/usuarios/login')
      .send({
        username: "",
        password: ""
      })
      .expect(401, done)
  });
});
