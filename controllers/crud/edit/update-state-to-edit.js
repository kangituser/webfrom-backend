const updateStateToEdit = async state => {
  state.syncStatus = 2;
  state.syncStatusName = "waiting update sync";
  state.syncUpdated = new Date();
  await state.update();
};

module.exports = { updateStateToEdit };