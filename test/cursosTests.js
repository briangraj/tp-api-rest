require('dotenv').config()
const expect = require('chai').expect,
  supertest = require('supertest'),
  api = supertest('http://localhost:8080');

let idCursoTemp

const body = {
  'Accept': 'application/json',
  'Authorization': process.env.TOKEN
}

function assertMessage(done, tipo) {
  return function(err, res) {
    expect(res.body).to.have.property("message");
    expect(res.body.message).to.be.a(tipo);
    done(err);
  }
}
describe('Test cursos', function() {
  describe('Al buscar todos los cursos', function() {
    it('deberia retornar 200 y message deberia ser un array', function(done) {
      api.get('/cursos')
        .set(body)
        .expect(200)
        .end(assertMessage(done, 'array'))
    });

    it('deberia retornar 400 cuando como duracion se manda \'hola\' y message deberia ser un array', function(done) {
      api.get('/cursos')
        .query({ duracion: 'hola' })
        .set(body)
        .expect(400)
        .end(assertMessage(done, 'array'))
    });
  });

  describe('Al buscar un curso', function() {
    it('deberia retornar 200 cuando el curso existe y message deberia ser un object', function(done) {
      api.get(`/cursos/${process.env.ID_CURSO}`)
        .set(body)
        .expect(200)
        .end(assertMessage(done, 'object'))
    });

    it('deberia retornar 404 cuando el curso no existe y message deberia ser un string', function(done) {
      api.get(`/cursos/${process.env.ID_CURSO.substring(1)}1`)
        .set(body)
        .expect(404)
        .end(assertMessage(done, 'string'))
    });
  });

  it('Al crear un curso deberia retornar 201', function(done) {
    api.post('/cursos')
      .set(body)
      .send({
        "anioDictado": 2020,
        "duracion": 300,
        "tema": "bigData",
        "alumnos": []
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, res) {
        idCursoTemp = res.body.message._id
        done(err)
      })
  });

  it('Cuando elimina un curso deberia retornar 200', function(done) {
    idCursoTemp = '5e34880ed4b73b01c2a63ae9'
    api.delete(`/cursos/${idCursoTemp}`)
      .set(body)
      .expect('Content-Type', /json/)
      .expect(200, done)
  });

  it('Al buscar el alumno destacado de un curso deberia retornar 200 y message deberia ser un object', function(done) {
    api.get(`/cursos/${process.env.ID_CURSO}/alumno-destacado`)
      .set(body)
      .expect(200)
      .end(assertMessage(done, 'object'))
  });
});
