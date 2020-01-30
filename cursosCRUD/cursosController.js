const Curso = require('../models/Curso');

// const { validationResult } = require('express-validator');

const getCursos = (req, res, next) => {
  const query = req.query || {};
  
  Curso.find(query).limit(10)
    .then(cursos => {
      res.status(200).json({
        code: 0,
        message: cursos
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        code: 20,
        message: "Ocurrió un error con un módulo interno"
      });
    })
};

const getCurso = (req, res, next) => {
  const id = req.params.id;

  Curso.findById(id)
    .then(curso => {
      if (!curso) {
        res.status(404).json({
          code: 12,
          message: "El recurso no fue encontrado"
        })
      } else {
        res.status(200).json({
          code: 0,
          message: curso
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        code: 20,
        message: "Ocurrió un error con un módulo interno"
      });
    })
};

module.exports = { getCursos, getCurso/*, postFactura, patchFactura, deleteFactura*/ };

// const postFactura = (req, res, next) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//         return res.status(400).json({
//             code: 10,
//             message: errors.array()
//         })
//     }

//     const body = req.body;

//     const newFactura = new Factura({
//         nroFactura: body.nroFactura,
//         condPago: body.condPago,
//         fechaVencimiento: body.fechaVencimiento
//     });

//     newFactura.save()
//         .then(created => {
//             res.status(201).json({
//                 code: 0,
//                 message: created
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 code: 20,
//                 message: "Ocurrió un error con un módulo interno"
//             });
//         })
// };

// const patchFactura = (req, res, next) => {
//     const id = req.params.id;
//     const body = req.body;

//     Factura.findById(id)
//         .then(factura => {
//             if (!factura) {
//                 res.status(404).json({
//                     code: 12,
//                     message: "Recurso no encontrado"
//                 });
//             } else {
//                 Object.keys(body).forEach(k => {
//                     factura[k] = body[k];
//                 });
//                 factura.save()
//                     .then(modified => {
//                         res.status(200).json({
//                             code: 0,
//                             message: modified
//                         });
//                     })
//                     .catch(err => {
//                         console.log(err);
//                         res.status(500).json({
//                             code: 20,
//                             message: "Ocurrió un error con un módulo interno"
//                         });
//                     });
//             }
//         })
// };

// const deleteFactura = (req, res, next) => {
//     const id = req.params.id;

//     Factura.findByIdAndDelete(id)
//         .then(() => {
//             res.status(200).json({
//                 code: 0,
//                 message: "Factura eliminada correctamente"
//             })
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 code: 20,
//                 message: "Ocurrió un error con un módulo interno"
//             });
//         })
// };
