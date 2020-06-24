const updateASR = async body => {  
  const { 
    status, 
    affection, 
    klhModule, 
    mainCategory, 
    subCategory, 
    srId, 
    closedStatus, 
    title, 
    description, 
    solution, 
    dateToIssue, 
    containerName, 
    blobName, 
    root_problem 
  } = body;
  const { findStatusById, findImpact, findKLHModuleById, findCategories, findASRById, findCloseStatus } = require('../../shared/sr-querrys');
  const { mainCatRouter } = require('../cat-router')
  try {
    const statusData = await findStatusById(status);    
    const impact = await findImpact(affection);
    const klh_moduleData = await findKLHModuleById(klhModule);
    const main = await findCategories(mainCategory)
    const sub = await mainCatRouter(main.catId, subCategory);
    const asr = await findASRById(srId);
    const close_status = await findCloseStatus(closedStatus);

    asr.title = title;
    asr.problem_type = main.catName || asr.problem_type;
    asr.problem_sub_type = sub || asr.problem_sub_type;
    asr.description = description || asr.description;
    asr.impact = affection || asr.impact;
    asr.impact_name = impact.affectionName || asr.impact_name;
    asr.sr_cust_module = klhModule || asr.sr_cust_module;
    asr.module_klh_name = klh_moduleData.moduleName || asr.module_klh_name;
    asr.status = statusData.statusId || asr.status;
    asr.status_name = statusData.statusName || asr.status_name;
    asr.update_time = new Date();
    asr.solution = solution || asr.solution;
    asr.dateToIssue = dateToIssue || asr.dateToIssue;
    asr.containerName = containerName || asr.containerName;
    asr.blobName = blobName || asr.blobName;
    asr.closeStatusId = close_status.statusId || asr.closeStatusId;
    asr.closeStatusName = close_status.statusName || asr.closeStatusName;
    asr.root_problem = root_problem || asr.root_problem;
    asr.close_time = new Date();
    
    await asr.save();
    return asr;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { updateASR };
