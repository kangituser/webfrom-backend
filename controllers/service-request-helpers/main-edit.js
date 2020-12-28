const ASR = require('../../models/ASR');
const BLOB = require('../../models/Blob');
const _queries = require('./queries');
const _edit = require('./edit');

module.exports = async (body, fullName, state) => {
  try {
    const { status, affection, klhModule, mainCategory, subCategory, srId, closedStatus, title, description, solution, 
      dateToIssue, containerName, blobName, root_problem } = body;
      
    let impact_name = await _queries.findImpact(affection);
    let module_klh_name = await _queries.findKLHModule(klhModule);
    let { catId, catName } = await _queries.findCategories(mainCategory);
    
    let problem_sub_type = await _edit.getSubCategoryName(catId, subCategory)
    let status_name = await _edit.getStatusName(status);
    let closeStatusName = await _edit.getCloseStatus(status);

    await ASR.update({ 
      title, 
      status,
      solution,
      dateToIssue,
      status_name,
      description,
      root_problem,
      closeStatusName,
      problem_sub_type,
      problem_type: catName,
      impact: affection,
      impact_name,
      sr_cust_module: klhModule,
      module_klh_name,
      update_time: new Date(),
      closeStatusId: closedStatus,
      close_time: new Date()
     }, 
     { where: { id: srId }})

     await BLOB.update({ containerName, blobName, 
     }, { where: { srId }});

     let updatedServiceRequest = await _edit.findServiceRequestById(srId);
     const { impact } = updatedServiceRequest;
     await _edit.sendToLog(impact, status, fullName, srId);

     await _edit.updateStateToEdit(state);
     return updatedServiceRequest;
  } catch (err) {
    throw err;
  }
}