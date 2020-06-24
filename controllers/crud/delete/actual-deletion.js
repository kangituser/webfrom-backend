const actualDeletion = async srId => {
  const { findASRById } = require('../../shared/sr-querrys');
  const { findBlobById } = require('../../shared/blob-querrys');
  try {
    const asr = await findASRById(srId);
    const image = await findBlobById(asr.id);
    if (image) {
      await image.destroy();
    }
    if (asr) {
      await asr.destroy();
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { actualDeletion };