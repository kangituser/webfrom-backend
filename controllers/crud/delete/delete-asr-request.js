const deleteASRequest = async (srId, res) => {
    
    const { responseHandler } = require('../../shared/response-handler');
    const { findStateById } = require('../../shared/user-querrys');
    const { actualDeletion } = require('./actual-deletion');
    const { updateStateToDelete } = require('./update-state-to-delete');
    const { createStateToDelete } = require('./create-state-to-delete');

    const states = [4, 5, 6];

    try {
      const state = await findState(srId);     
      if (!state) {
        await createStateToDelete(srId);
        responseHandler(res, 201, { message: 'state does not exist, created a state with id 4 to delete' });
      } else {
        if (!states.includes(state.syncStatus)) {
          const stateToUpdate = await findState(srId);
          await updateStateToDelete(stateToUpdate);
          responseHandler(res, 201, { message: 'sysaid service request destroyed, status updated for deletion' });
        } else {
          responseHandler(res, 401, { message: 'nothing to delete' });
        }
      }
      await actualDeletion(srId);
    } catch (err) {
      responseHandler(res, 500, { message: err.message })
    }
  }

module.exports = { deleteASRequest };