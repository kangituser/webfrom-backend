const updateASR = async body => {    
  const { status, affection, klhModule, mainCategory, subCategory, srId, closedStatus, title, description, solution, 
    dateToIssue, containerName, blobName, root_problem } = body;
    
  const { findStatusById, findImpact, findKLHModuleById, findCategories, findASRById, findCloseStatus } = require('../../shared/sr-querrys');
  const { mainCatRouter } = require('../cat-router');
  const ASR = require('../../../models/ASR');
  const BLOB = require('../../../models/Blob');

  try {
    // const { statusName: nameOfStatus } = await findStatusById(status);        
    const { affectionName } = await findImpact(affection);    
    const { moduleName } = await findKLHModuleById(klhModule);
    const { catId, catName } = await findCategories(mainCategory)    
    // const { catName: subCatName } = subCategory ? await mainCatRouter(catId, subCategory): null;   
    // const { statusName: closedStatusName } = closedStatus == null ? null : await findCloseStatus(closedStatus);  

    const getSubCatName = async (catId, subCategory) => {
      if(subCategory) {
        const { catName: subCatName } = await mainCatRouter(catId, subCategory)
        return subCatName;
      } else {
        return null;
      }
    };
    const getClosedStatusName = async closedStatus => {
      if (closedStatus) {
        const { statusName: closedStatusName } = await findCloseStatus(closedStatus);  
        return closedStatusName;
      } else {
        return null;
      }
    };

    const getNameOfStatus = async status => {
      if (status) {
        const { statusName: nameOfStatus } = await findStatusById(status);
        return nameOfStatus;
      } else {
        return null;
      }
    };

    
    await ASR.update({ 
      title: title, 
      problem_type: catName,
      problem_sub_type: await getSubCatName(catId, subCategory),
      description: description,
      impact: affection,
      impact_name: affectionName,
      sr_cust_module: klhModule,
      module_klh_name: moduleName,
      status: status,
      status_name: await getNameOfStatus(status),
      update_time: new Date(),
      solution: solution,
      dateToIssue: dateToIssue,
      closeStatusId: closedStatus,
      closeStatusName: await getClosedStatusName(closedStatus),
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
