
const createState = async asrId => {
  const STATE = require('../../../models/state');
  await STATE.create({
    srId: asrId,
    syncStatus: 0,
    syncStatusName: 'waiting insert sync',
    syncUpdated: new Date(),
  });
}

module.exports = { createState };