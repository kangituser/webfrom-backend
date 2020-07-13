const updateASR = async body => {    
  const { status, affection, klhModule, mainCategory, subCategory, srId, closedStatus, title, description, solution, 
    dateToIssue, containerName, blobName, root_problem } = body;
    
  const { findStatusById, findImpact, findKLHModuleById, findCategories, findCloseStatus } = require('../../shared/sr-querrys');
  const { mainCatRouter } = require('../cat-router');
  const ASR = require('../../../models/ASR');
  const BLOB = require('../../../models/Blob');
  let closedStatusName, subCatName, statusName;
  try {
    // const { statusName } = status ? await findStatusById(status) : null;        
    const { affectionName } = await findImpact(affection);    
    const { moduleName } = await findKLHModuleById(klhModule);
    const { catId, catName } = await findCategories(mainCategory)    
    
    if (subCategory.trim() == null || subCategory.trim() == '') {
      subCatName = null;
    } 
    subCatName = await mainCatRouter(catId, subCategory);   
    
    if (closedStatus != 0) {
      closedStatusName = await findCloseStatus(closedStatus);  
    } else {
      closedStatusName = null;
    }

    if (!status) {
      statusName = null;
    } else {
      statusName = await findStatusById(status);
    }
    
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
