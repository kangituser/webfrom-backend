const updateASR = async body => {    
  const { status, affection, klhModule, mainCategory, subCategory, srId, closedStatus, title, description, solution, 
    dateToIssue, containerName, blobName, root_problem } = body;
  const { findStatusById, findImpact, findKLHModuleById, findCategories, findASRById, findCloseStatus } = require('../../shared/sr-querrys');
  const { mainCatRouter } = require('../cat-router');
  const ASR = require('../../../models/ASR');
  try {
    const { statusName } = await findStatusById(status);        
    const impact = await findImpact(affection);    
    const { moduleName } = await findKLHModuleById(klhModule);
    const { catId, catName } = await findCategories(mainCategory)
    const sub = subCategory == ' ' ? await mainCatRouter(catId, subCategory) : null;
     
    const { closedStatusName } = closedStatus !== 0 ? await findCloseStatus(closedStatus): null;  

    await ASR.update({ 
      title: title, 
      problem_type: catName,
      problem_sub_type: sub,
      description: description,
      impact: affection,
      impact_name: impact,
      sr_cust_module: klhModule,
      module_klh_name: moduleName,
      status: status,
      status_name: statusName,
      update_time: new Date(),
      solution: solution,
      dateToIssue: dateToIssue,
      containerName: containerName,
      blobName: blobName,
      closeStatusId: closedStatus,
      closeStatusName: closedStatusName,
      root_problem: root_problem,
      close_time: new Date()
     }, 
     { where: { id: srId }})
    
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { updateASR };
