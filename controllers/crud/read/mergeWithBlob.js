const mergeBLOBwithASR = async sr => {
  const { findAllClosedStatuses } = require('../../shared/sr-querrys');
  const uniqueSRIDsFROMs = require('./uniqueStatusSrIds')
  const srSRIDS = uniqueSRIDsFROMs(sr);
  const ASR = require('../../../models/ASR');
  const BLOB = require('../../../models/Blob');
  const statuses = await findAllClosedStatuses();
  
  let srs = await ASR.findAll({ 
    where: { id: srSRIDS }, 
    include: [
      { model: BLOB, attributes: ['blobName', 'containerName'] },
    ], raw: true }) 
      
  for (let j = 0; j < srs.length; j++ ) {
    for (let i = 0; i < statuses.length; i++) {
      if (statuses[i].srId == srs[j].id && +statuses[i].new_value === 3 || (+statuses[i].old_value !== 3 && +statuses[i].old_value === 3) || srs[j].status === 'סגור') {
        srs[j].closed_by = statuses[i].edited_by;
      }
     }
  }     
 
  let mapped = [];
  srs.forEach(sr => {
    mapped.push({
      affection: sr.impact_name,
      blobName: sr['mvcBLOBs.blobName'],
      close_time: sr.close_time,
      closedStatus: sr.closeStatusName,
      containerName: sr['mvcBLOBs.containerName'],
      dateToIssue: sr.dateToIssue,
      description: sr.description,
      emailAddress: sr.email_open,
      klhModule: sr.module_klh_name,
      mainCategory: sr.problem_type,
      name: sr.name_open,
      phoneNumber: sr.phone_open,
      requestTime: sr.dateToIssue,
      root_problem: sr.root_problem,
      solution: sr.solution,
      srId: sr.id,
      status: sr.status_name,
      subCategory: sr.problem_sub_type,
      title: sr.title,
    })
  })

  mapped.sort((a, b) => b.srId - a.srId);

  return mapped;
};

module.exports = { mergeBLOBwithASR };