const editASRequest = async (body, user, originalUrl, res) => { 
    const LOG = require('../../../models/Change_log');
    const { responseHandler } = require('../../shared/response-handler')
    const { findASRById } = require('../../shared/sr-querrys');
    const { updateASR } = require('./update-asr');
    const { updateStateToEdit } = require('./update-state-to-edit');
    const { createEditState } = require('./create-edit-state');
    const { updateStateToError } = require('./update-state-to-error');
    const { sendASRDeitedMail } = require('./send-email');
    const { findStateById } = require('../../shared/sr-querrys');
    const states = [0, 1, 2, 3];
    const { srId, affection } = body;
    
    try {
      const state = await findStateById(srId);        
      if (!state) {      
        await createEditState(srId);
        responseHandler(res, 201, { message: 'created a new state' });
       } else {
         if (states.includes(state.syncStatus)) { 
           const updatedASR = await findASRById(srId);                 
            const editedASR = await updateASR(body);                     
            if (updatedASR.impact !== affection) { 
             await LOG.create({ old_value: updatedASR.impact, new_value: affection, date_edited: new Date(), edited_by: user.fullName, srId: srId })           
            }
            await updateStateToEdit(state)           
            if (editedASR.status === 2) {
              sendASRDeitedMail(editedASR, user, body, true, originalUrl, true, false);
            } else if (editedASR.status === 3) {            
              sendASRDeitedMail(editedASR, user, body, true, originalUrl, false, true);
            } else {
              sendASRDeitedMail(editedASR, user, body, true, originalUrl, false, false);
            }
          responseHandler(res, 201, { message: 'success' });
        } else if (state.syncStatus === 6) {
          await updateStateToError(state)
          responseHandler(res, 201, { message: 'success' });
        } else {
          responseHandler(res, 401, { message: 'record was not updated' });
        }
      }    
    } catch (err) {
      responseHandler(res, 500, { message: err.message});
    }
  }

module.exports = { editASRequest };