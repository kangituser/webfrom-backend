const ASR = require("../../models/ASR");
const BLOB = require("../../models/Blob");
const STATE = require("../../models/state");

module.exports = {
  setStateToDelete: async srId => {
    try {
      await STATE.create({
        srId,
        syncStatus: 4,
        syncStatusName: "delete",
        syncUpdated: new Date(),
      });
    } catch (err) {
      throw err;
    }
  },

  updateStateToDelete: async id => {
    try {
      await STATE.update({ syncStatus: 4, syncStatusName: "delete" }, { id });
    } catch (err) {
      throw err;
    }
  },

  findStateById: async srId => {
    try {
      return await STATE.findOne({ where: { srId } });
    } catch (err) {
      throw err;
    }
  },

  deleteServiceRequest: async srId => {
    try {
      await BLOB.destroy({ where: { srId } });
      await ASR.destroy({ where: { id: srId } });
    } catch (err) {
      throw err;
    }
  },
};
