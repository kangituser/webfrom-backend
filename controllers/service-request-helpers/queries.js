const CATEGORIES = require("../../models/categories");
const IMPACT = require("../../models/impact");
const MODULE = require("../../models/klhmodules");
const STATE = require("../../models/state");

module.exports = {
  findKLHModule: async moduleId => {
    try {
      return await MODULE.findOne({
        where: { moduleId },
        attributes: [["moduleName", "module_klh_name"]],
        raw: true
      }).module_klh_name;
    } catch (err) {
      throw err;
    }
  },

  findImpact: async catId => {
    try {
      return await IMPACT.findOne({
        where: { catId },
        attributes: [["affectionName", "impact_name"]],
      }).impact_name;
    } catch (err) {
      throw err;
    }
  },

  findCategories: async catId => {
    try {
      return await CATEGORIES.findOne({
        where: { catId },
        attributes: ["catName", "catId"],
      });
    } catch (err) {
      throw err;
    }
  },

  findStateById: async srId => {
    try {
      return await STATE.findOne({ where: { srId } })
    } catch (err) {
      throw err;
    }
  },
};
