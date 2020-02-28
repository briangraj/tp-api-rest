const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);
require('dotenv').config();

describe('Test cursos', function() {
  describe('Al buscar todos los cursos', function() {
    it('deberia retornar 200 y message deberia ser un array', async done => {
      const response = await request.get('/cursos').set('Accept', 'application/json').set('Authorization', process.env.TOKEN);

      expect(response.status).toBe(200);
      expect(response.body.message).toBeInstanceOf(Array);
      done()
    })
  })
});