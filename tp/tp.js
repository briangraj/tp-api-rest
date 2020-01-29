const mongoose = require('mongoose');
const uri = "mongodb://localhost:27017/tp";

// const logger = require('../utils/logger')(__filename);
const operations = require('./operations');

const Curso = require('./models/Curso');

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    //logger.info("Conexion exitosa a la db tp");
    console.log("Conexion exitosa a la db tp")
    //operations[process.argv[2]](mongoose.connection, Movie)
    console.log()
    operations.readOne(Curso)
      .then(result => {
        console.log(`Resultado: \n ${JSON.stringify(result, null, 2)}`)
      })
  })
  .catch(err => {
    //logger.error(err);
    console.log(err)
    process.exit(1)
  });
