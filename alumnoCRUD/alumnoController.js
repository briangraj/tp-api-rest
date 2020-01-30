const Curso = require('../models/Curso');

const getAlumnos = (req, res, next) => {
  res.status(200).json({
    code: 0,
    message: req.curso.alumnos
  });
};

  module.exports = { getAlumnos/*, postItem, deleteItems*/ };

// const postItem = (req, res, next) => {
//     const id = req.params.id;
//     const body = req.body;

//     Factura.findById(id)
//         .then(factura => {
//             if (!factura) {
//                 return res.status(404).json({
//                     code: 12,
//                     message: "Recurso no encontrado"
//                 });
//             }

//             const item = {
//                 cantidad: body.cantidad,
//                 precio: body.precio,
//                 producto: body.producto
//             };

//             factura.item.push(item);
//             factura.save()
//                 .then(modified => {
//                     res.status(200).json({
//                         code: 0,
//                         message: modified
//                     })
//                 });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 code: 20,
//                 message: "Ocurrió un error con un módulo interno"
//             });
//         })
// };

// const deleteItems = (req, res, next) => {
//     const id = req.params.id;

//     Factura.findById(id)
//         .then(factura => {
//             if (!factura) {
//                 res.status(404).json({
//                     code: 12,
//                     message: "Recurso no encontrado"
//                 })
//             } else {
//                 factura.item = [];
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
