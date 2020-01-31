require('dotenv').config()
const should = require('chai').should(),
  expect = require('chai').expect,
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

describe('Al buscar todos los cursos', function() {
  var location1;
  var location2;
  var location3;
  var locations = [location1, location2, location3];

  // before(function (done) {
  //   api.post('/locations')
  //     .set('Accept', 'application/x-www-form-urlencoded')
  //     .send({
  //       addressStreet: "222 Main St",
  //       addressCity: "Portland",
  //       addressState: "OR",
  //       addressZip: "97209",
  //       userId: 2
  //     })
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .end(function (err, res) {
  //       location2 = res.body;
  //     });

  //   api.post('/locations')
  //     .set('Accept', 'application/x-www-form-urlencoded')
  //     .send({
  //       addressStreet: "333 Main St",
  //       addressCity: "Portland",
  //       addressState: "OR",
  //       addressZip: "97209",
  //       userId: 3
  //     })
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .end(function (err, res) {
  //       location3 = res.body;
  //       done();
  //     });
  // });

  it('deberia retornar 200 cuando tiene el token', function(done) {
    api.get('/cursos')
      .set(body)
      .expect(200)
      .end(assertMessage(done, 'array'))
  });

  it('deberia retornar 401 cuando no tiene el token', function(done) {
    api.get('/cursos')
      .set('Accept', 'application/json')
      .expect(401)
      .end(assertMessage(done, 'string'))
  });

  //TODO deberia ser 4xx
  it('deberia retornar 500 cuando no puede resolver', function(done) {
    api.get('/cursos')
      .query({ duracion: 'hola' })
      .set(body)
      .expect(500)
      .end(assertMessage(done, 'string'))
  });

  // it('should return a 200 response', function(done) {
  //   api.get('/cursos')
  //     .set('Accept', 'application/json')
  //     .expect(200, done);
  // });

  // it('should be an object with keys and values', function (done) {
  //   api.get('/users/1')
  //     .set('Accept', 'application/json')
  //     .expect(200)
  //     .end(function (err, res) {
  //       expect(res.body).to.have.property("name");
  //       expect(res.body.name).to.not.equal(null);
  //       expect(res.body).to.have.property("email");
  //       expect(res.body.email).to.not.equal(null);
  //       expect(res.body).to.have.property("phoneNumber");
  //       expect(res.body.phoneNumber).to.not.equal(null);
  //       expect(res.body).to.have.property("role");
  //       expect(res.body.role).to.not.equal(null);
  //       done();
  //     });
  // });

  // it('should have a 10 digit phone number', function (done) {
  //   api.get('/users/1')
  //     .set('Accept', 'application/json')
  //     .expect(200)
  //     .end(function (err, res) {
  //       expect(res.body.phoneNumber.length).to.equal(10);
  //       done();
  //     });
  // });

  // it('should have the role of admin', function (done) {
  //   api.get('/users/1')
  //     .set('Accept', 'application/json')
  //     .expect(200)
  //     .end(function (err, res) {
  //       expect(res.body.role).to.equal("admin");
  //       done();
  //     });
  // });

  // it('should be updated with a new name', function (done) {
  //   api.put('/users/1')
  //     .set('Accept', 'application/x-www-form-urlencoded')
  //     .send({
  //       name: "Kevin",
  //       email: "kevin@example.com",
  //       phoneNumber: "9998887777",
  //       role: "editor"
  //     })
  //     .expect(200)
  //     .end(function (err, res) {
  //       expect(res.body.name).to.equal("Kevin");
  //       expect(res.body.email).to.equal("kevin@example.com");
  //       expect(res.body.phoneNumber).to.equal("9998887777");
  //       expect(res.body.role).to.equal("editor");
  //       done();
  //     });
  // });

  // it('should access their own locations', function (done) {
  //   api.get('/users/1/location')
  //     .set('Accept', 'application/x-www-form-urlencoded')
  //     .send({
  //       userId: 1
  //     })
  //     .expect(200)
  //     .end(function (err, res) {
  //       expect(res.body.userId).to.equal(1);
  //       expect(res.body.addressCity).to.equal("Portland");
  //       done();
  //     });
  // });


  // it('should not be able to access other users locations', function (done) {
  //   api.get('/users/2/location')
  //     .set('Accept', 'application/x-www-form-urlencoded')
  //     .send({
  //       userId: 1
  //     })
  //     .expect(401)
  //     .end(function (err, res) {
  //       if (err) return done(err);
  //       expect(res.error.text).to.equal("Unauthorized");
  //       done();
  //     });
  // });

});

describe('Al buscar un curso', function() {
  it('deberia retornar 200 cuando el curso existe', function(done) {
    api.get(`/cursos/${process.env.ID_CURSO}`)
      .set(body)
      .expect(200)
      .end(assertMessage(done, 'object'))
  });

  it('deberia retornar 404 cuando el curso no existe', function(done) {
    api.get(`/cursos/${process.env.ID_CURSO.substring(1)}1`)
      .set(body)
      .expect(404)
      .end(assertMessage(done, 'string'))
  });
});

  //   api.post('/cursos')
  //     .set('Accept', 'application/x-www-form-urlencoded')
  //     .send({
  //       addressStreet: "111 Main St",
  //       addressCity: "Portland",
  //       addressState: "OR",
  //       addressZip: "97209",
  //       userId: 1
  //     })
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .end(function (err, res) {
  //       location1 = res.body;
  //     });


// describe('', function() {
  // it('Al crear un curso deberia retornar 201', function(done) {
  //   api.post('/cursos')
  //     .set(body)
  //     .send({
  //       "anioDictado": 2020,
  //       "duracion": 300,
  //       "tema": "bigData",
  //       "alumnos": []
  //     })
  //     .expect('Content-Type', /json/)
  //     .expect(201)
  //     .end(function(err, res) {
  //       idCursoTemp = res.body.message._id
  //       done(err)
  //     })
  // });

  it('Cuando elimina un curso deberia retornar 200', function(done) {
    idCursoTemp = '5e34880ed4b73b01c2a63ae9'
    api.delete(`/cursos/${idCursoTemp}`)
      .set(body)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        done(err)
      })
  });
// });
