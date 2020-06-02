const STATE = require("../../models/state");
const { findState, findASRById, findBlobById } = require("../../shared/query-store");

const createStateToDelete = async srId => {
  await STATE.create({
    srId: srId,
    syncStatus: 4,
    syncStatusName: "delete",
    syncUpdated: new Date(),
  });
};

const updateStateToDelete = async stateToUpdate => {
  stateToUpdate.syncStatus = 4;
  stateToUpdate.syncStatusName = "delete";
  await stateToUpdate.save();
};

const actualDeletion = async srId => {
  try {
    const asr = await findASRById(srId);    
    const image = await findBlobById(asr.id);
    if (image) {
      await image.destroy();
    }
    if (asr) {
      await asr.destroy();
    }
  } catch (err) {
    console.log(err.message);
  }
}

const deleteASRequest = async (srId, res) => {
  const stats = [4, 5, 6];
  let message;
  let status;
  try {
    const state = await findState(srId, res);     
    if (!state) {
      // created state for deletion
      await createStateToDelete(srId);
      message = 'state does not exist, created a state with id 4 to delete';
      status = 201;
    } else {
      if (!stats.includes(state.syncStatus)) {
        const stateToUpdate = await findState(srId);
        await updateStateToDelete(stateToUpdate);
        message = 'sysaid service request destroyed, status updated for deletion';
        status = 201;
      } else {
        status = 401;
        message = 'nothing to delete';
      }
    }
    await actualDeletion(srId);
    res.status(status).json({ message: message});
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = { deleteASRequest };