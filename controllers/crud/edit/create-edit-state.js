const createEditState = async srId => {
  const STATE = require("../../../models/state");
  await STATE.create({
    srId: srId,
    syncStatus: 2,
    syncStatusName: "waiting update sync",
    syncUpdated: new Date(),
  });
};

module.exports = { createEditState };