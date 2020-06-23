const updateStateToError = async state => {
  state.syncStatus = 6;
  state.syncStatusName = "error";
  state.syncUpdated = new Date();
  await state.update();
};

module.exports = { updateStateToError };