const mergeBLOBwithASR = async sr => {
  const { findAllBlobs } = require("../../shared/blob-querrys");
  const { findAllClosedStatuses } = require('../../shared/sr-querrys');
  let merged = [];
  const blob = await findAllBlobs();
  const statuses = await findAllClosedStatuses(); 
  
  for (let i = 0; i < blob.length; i++) {
    for (let j = 0; j < sr.length; j++) {
      if (blob[i].srId === sr[j].srId) {
        merged.push({
          ...sr[j],
          blobName: blob[i].blobName,
          containerName: blob[i].containerName,
        });
      }
    }
  }
  merged.sort((a, b) => b.srId - a.srId);

  
    for (let j = 0; j < merged.length; j++ ) {
      for (let i = 0; i < statuses.length; i++) {
        if (statuses[i].srId === merged[j].srId && +statuses[i].new_value === 3) {
          merged[j].closed_by = statuses[i].edited_by;
        }
      }
    }    
  return merged;
};

module.exports = { mergeBLOBwithASR };