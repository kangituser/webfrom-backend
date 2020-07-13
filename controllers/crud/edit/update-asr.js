const updateASR = async body => {    
  const { status, affection, klhModule, mainCategory, subCategory, srId, closedStatus, title, description, solution, 
    dateToIssue, containerName, blobName, root_problem } = body;
    
  const { findStatusById, findImpact, findKLHModuleById, findCategories, findASRById, findCloseStatus } = require('../../shared/sr-querrys');
  const { mainCatRouter } = require('../cat-router');
  const ASR = require('../../../models/ASR');
  const BLOB = require('../../../models/Blob');

  try {
    const { statusName } = await findStatusById(status);        
    const { affectionName } = await findImpact(affection);    
    const { moduleName } = await findKLHModuleById(klhModule);
    const { catId, catName } = await findCategories(mainCategory)    
    const { catName: subCatName } = subCategory == ' ' ? null: await mainCatRouter(catId, subCategory);   
    const { statusName: closedStatusName } = closedStatus == 0 ? null : await findCloseStatus(closedStatus);  
    
    await ASR.update({ 
      title: title, 
      problem_type: catName,
      problem_sub_type: subCatName,
      description: description,
      impact: affection,
      impact_name: affectionName,
      sr_cust_module: klhModule,
      module_klh_name: moduleName,
      status: status,
      status_name: statusName,
      update_time: new Date(),
      solution: solution,
      dateToIssue: dateToIssue,
      closeStatusId: closedStatus,
      closeStatusName: closedStatusName,
      root_problem: root_problem,
      close_time: new Date()
     }, 
     { where: { id: srId }})

     await BLOB.update({
      containerName: containerName,
      blobName: blobName,
     }, { where: { srId: srId }})
    
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { updateASR };
