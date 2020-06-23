const mergeBLOBwithASR = async sr => {
  const { findAllBlobs } = require("../../shared/blob-querrys");
  let merged = [];
  const blob = await findAllBlobs();

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
  return merged;
};

module.exports = { mergeBLOBwithASR };