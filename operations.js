const readOneOperation = (Model) => {
  // if (!process.argv[4]) {
  //     return Promise.reject("Falta un parametro de filtro para el campo title")
  // }
  return Model.findOne({tema: "bigData"})
};

module.exports = {
  // create: executeOneManyOp(insertOneOperation, insertManyOperation),
  // read: executeOneManyOp(readOneOperation, readManyOperation),
  readOne: readOneOperation
  // update: executeOneManyOp(updateOneOperation, updateManyOperation),
  // delete: executeOneManyOp(deleteOneOperation, deleteManyOperation),
  // aggregate: executeOneManyOp(aggregateOperation, undefined)
};

