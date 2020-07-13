const actualDeletion = async srId => {
  const BLOB = require('../../../models/Blob');
  const ASR = require('../../../models/ASR');
  
  try {
    await BLOB.destroy({ where: { srId: srId }})
    await ASR.destroy({ where: { id: srId }});
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { actualDeletion };