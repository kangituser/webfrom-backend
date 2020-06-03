const STATE = require('../../models/state');
const LOG = require('../../models/Change_log');
const mail = require('../../mail/massage-routelet');
const STATUS = require('../../models/status');
const MODULE = require('../../models/klhmodules');
const IMPACT = require('../../models/impact');
const CATEGORIES = require('../../models/categories');
const { mainCatRouter } = require('./cat-router');
const ASR = require('../../models/ASR');
const CLOSE_STATUS = require('../../models/close-status');
const { findState, findASRById } = require("../../shared/query-store");

const createEditState = async srId => {
  await STATE.create({
    srId: srId,
    syncStatus: 2,
    syncStatusName: "waiting update sync",
    syncUpdated: new Date(),
  });
};

const updateStateToEdit = async state => {  
  state.syncStatus = 2;
  state.syncStatusName = "waiting update sync";
  state.syncUpdated = new Date();
  await state.update();
};

const updateStateToError = async state => {
  state.syncStatus = 6;
  state.syncStatusName = "error";
  state.syncUpdated = new Date();
  await state.update();
};

const updateASR = async (res, body) => {     
  try {    
  const status = await STATUS.findOne({ where: { statusId: body.status }});  
  const impact = await IMPACT.findOne({ where: { catId: body.affection }});
  const klh_module = await MODULE.findOne({ where: { moduleId: body.klhModule }});  
  const main = await CATEGORIES.findOne({ where: { catId: body.mainCategory }});  
  const sub = await mainCatRouter(main.catId, body.subCategory);  
  const asr = await ASR.findOne({ where: { id: body.srId}});
  const close_status = await CLOSE_STATUS.findOne({ where: { statusId: body.closedStatus }})
    
  asr.title = body.title;
  asr.problem_type = main.catName;
  asr.problem_sub_type = sub;
  asr.description = body.description;
  asr.impact = body.affection;
  asr.impact_name = impact.affectionName;
  asr.sr_cust_module = body.klhModule;
  asr.module_klh_name = klh_module.moduleName;
  asr.status = body.status;
  asr.status_name = status.statusName;
  asr.update_time = new Date();
  asr.solution = body.solution;    
  asr.dateToIssue = body.dateToIssue;    
  asr.containerName = body.containerName;    
  asr.blobName = body.blobName;    
  asr.closeStatusId = close_status.statusId;
  asr.closeStatusName = close_status.statusName;

  await asr.save();
  return asr;
  } catch (err) {
    console.log(err.message);
  }
};

const sendASRDeitedMail = async (updatedASR, authUser, ASRtoUpdate, isChanged, route, processed, closed) => {
  const klh_module = await MODULE.findOne({ where: { moduleId: ASRtoUpdate.klhModule }})
  const status = await STATUS.findOne({ where: { statusId: ASRtoUpdate.status }});
  const impact = await IMPACT.findOne({ where: { catId: ASRtoUpdate.affection }})  
  mail.messageRoutelet({
    srId: updatedASR ? updatedASR.id: null,
    category: updatedASR ? updatedASR.problem_type: null,
    subCategory: updatedASR ? updatedASR.problem_sub_type: null,
    status: status.statusName,
    module: klh_module.moduleName,
    title: ASRtoUpdate.title,
    description: ASRtoUpdate.description,
    email: authUser.email,
    name: authUser.fullName,
    impact: impact.affectionName,
    isChanged: isChanged,
    updated: processed,
    closed: closed,
    closeStatusName: updatedASR.closeStatusName
  }, route);
};

const editASRequest = async (body, user, originalUrl, res) => {  
  let status;
  let message;
  const route = originalUrl;
  const stats = [0, 1, 2, 3];
  
  try {
    const state = await findState(body.srId);        
    if (!state) {      
      await createEditState(srId);
      status = 201;
      message = 'created a new state';
     } else {
       if (stats.includes(state.syncStatus)) { 
         const updatedASR = await findASRById(body.srId);                 
          const editedASR = await updateASR(res, body);                     
          if (updatedASR.impact !== body.affection) { 
           await LOG.create({ old_value: updatedASR.impact, new_value: body.affection, date_edited: new Date(), edited_by: user.fullName, srId: body.srId })           
          }
          await updateStateToEdit(state)           
          if (editedASR.status === 2) {
            sendASRDeitedMail(editedASR, user, body, true, route, true, false);
          } else if (editedASR.status === 3) {            
            sendASRDeitedMail(editedASR, user, body, true, route, false, true);
          } else {
            sendASRDeitedMail(editedASR, user, body, true, route, false, false);
          }
        status = 201;
        message = 'success';
      } else if (state.syncStatus === 6) {
        await updateStateToError(state)
        status = 201;
        message = 'success';
      } else {
        status = 401;
        message = 'record was not updated';
      }
    }    
    res.status(status).send({ message: message });
  } catch (err) {
    res.status(500).send({ message: err.message});
  }
}

module.exports = { editASRequest };