const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const fs = require('fs');

const cursosRouter = require('./cursosCRUD/cursosRouter');
const usuariosRouter = require('./usuariosCRUD/usuariosRouter');
const auth = require('./usuariosCRUD/usuariosValidator');
const Status = require('./utils/Status');
const swaggerString = fs.readFileSync('./openapi.yaml', 'utf8');
const swaggerDocument = YAML.parse(swaggerString);

const app = express();
const mongoURI = "mongodb://localhost:27017/tp";
process.env.JWT_KEY = "clave_segura";

app.use(cors());
app.use(bodyParser.json());
app.use('/cursos', auth, cursosRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/usuarios', usuariosRouter);
app.use('/', (req, res, next) => { Status.ok(res, "Estás en la página de inicio") });
app.use(function(err, req, res, next) {
  console.error(err)
  Status.internalServerError(res)
});

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .catch(err => {
    console.log(err);
  });

module.exports = app;