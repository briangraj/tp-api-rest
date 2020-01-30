const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');

const cursosRouter = require('./cursosCRUD/cursosRouter');
const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();
const port = 8080;
const mongoURI = "mongodb://localhost:27017/tp";

app.use(bodyParser.json());

app.use('/cursos', cursosRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', (req, res, next) => { res.status(200).json({code: 0, message: "Estás en la página de inicio"}) });

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    app.listen(port, () => { console.log(`Corriendo en port ${port}`) })
  })
  .catch(err => {
    console.log(err);
  });
