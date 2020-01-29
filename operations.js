const readManyOperation = (Model) => {
  // if (!process.argv[4]) {
  //     return Promise.reject("Falta un parametro de filtro para el campo title")
  // }
  return Model.find({tema: "bigData"})
};

module.exports = {
  // create: executeOneManyOp(insertOneOperation, insertManyOperation),
  // read: executeOneManyOp(readOneOperation, readManyOperation),
  readMany: readManyOperation
  // update: executeOneManyOp(updateOneOperation, updateManyOperation),
  // delete: executeOneManyOp(deleteOneOperation, deleteManyOperation),
  // aggregate: executeOneManyOp(aggregateOperation, undefined)
};

