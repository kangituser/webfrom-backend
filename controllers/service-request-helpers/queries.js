const IMPACT = require("../../models/impact");
const MODULE = require("../../models/klhmodules");

module.exports = {
  findKLHModule: async moduleId => {
    try {
      return await MODULE.findOne({
        where: { moduleId },
        attributes: ["moduleName"],
      });
    } catch (err) {
      throw err;
    }
  },

  findImpact: async catId => {
    try {
      return await IMPACT.findOne({
        where: { catId },
        attributes: ["affectionName"],
      });
    } catch (err) {
      throw err;
    }
  },

  findCategories: async catId => {
    try {
      return await CATEGORIES.findOne({ where: { catId }, attributes: ["catName", "catId"] });
    } catch (err) {
      throw err;
    }
  },
};
