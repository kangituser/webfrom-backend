const updateStateToDelete = async stateToUpdate => {
  stateToUpdate.syncStatus = 4;
  stateToUpdate.syncStatusName = "delete";
  await stateToUpdate.save();
};

module.exports = { updateStateToDelete };