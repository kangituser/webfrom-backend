
const createStateToDelete = async (srId) => {
  const STATE = require("../../../models/state");
  await STATE.create({
    srId: srId,
    syncStatus: 4,
    syncStatusName: "delete",
    syncUpdated: new Date(),
  });
};

module.exports = { createStateToDelete };