
const createBlob = async (asrId, blobName, containerName) => {
  const BLOB = require('../../../models/Blob');
  await BLOB.create({
    srId: asrId,
    blobName: blobName,
    containerName: containerName,
    blobServer: 1,
  });
}

module.exports = { createBlob };