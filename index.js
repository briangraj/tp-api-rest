const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cursosRouter = require('./cursosCRUD/cursosRouter');

const app = express();
const port = 8080;

app.use(bodyParser.json());

app.use('/cursos', cursosRouter);

app.use('/', (req, res, next) => { res.status(200).json({code: 0, message: "Estás en la página de inicio"}) });

const mongoURI = "mongodb://localhost:27017/tp";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    app.listen(port, () => { console.log(`Corriendo en port ${port}`) })
  })
  .catch(err => {
    console.log(err);
  });





// const operations = require('./operations');

// const Curso = require('./models/Curso');

// mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
//   .then(() => {
//     //logger.info("Conexion exitosa a la db tp");
//     console.log("Conexion exitosa a la db tp")
//     //operations[process.argv[2]](mongoose.connection, Movie)
//     console.log()
//     operations.readMany(Curso)
//       .then(result => {
//         console.log(`Resultado: \n ${JSON.stringify(result, null, 2)}`)
//       })
//   })
//   .catch(err => {
//     //logger.error(err);
//     console.log(err)
//     process.exit(1)
//   });


