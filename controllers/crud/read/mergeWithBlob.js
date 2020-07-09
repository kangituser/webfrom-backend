const CHANGE_LOG = require('../../../models/Change_log');

const mergeBLOBwithASR = async sr => {
  const { findAllClosedStatuses } = require('../../shared/sr-querrys');
  const uniqueSRIDsFROMs = require('./uniqueStatusSrIds')
  const srSRIDS = uniqueSRIDsFROMs(sr);
  const ASR = require('../../../models/ASR');
  const BLOB = require('../../../models/Blob');
  const statuses = await findAllClosedStatuses();
  
  let srs = await ASR.findAll({ 
    where: { id: srSRIDS, status: 3 }, 
    include: [
      { model: BLOB, attributes: ['blobName', 'containerName'] },
    ], raw: true }) 

    console.log(srs)
      
  for (let j = 0; j < srs.length; j++ ) {
    for (let i = 0; i < statuses.length; i++) {
      if (statuses[i].srId == srs[j].id && +statuses[i].new_value === 3 || (+statuses[i].old_value !== 3 && +statuses[i].old_value === 3) || srs[j].status === 'סגור') {
        srs[j].closed_by = statuses[i].edited_by;
      }
     }
  }     
  return srs;
};

module.exports = { mergeBLOBwithASR };