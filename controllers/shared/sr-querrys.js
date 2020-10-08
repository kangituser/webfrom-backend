const ASR = require("../../models/ASR");
const MODULE = require("../../models/klhmodules");
const IMPACT = require("../../models/impact");
const CATEGORIES = require("../../models/categories");
const STATUS = require("../../models/status");
const CLOSE_STATUS = require("../../models/close-status");
const STATE = require("../../models/state");
 
const findASRById = async id => await ASR.findOne({ where: { id: id } });

const findKLHModule = async KLHModule => await MODULE.findOne({ where: { moduleId: KLHModule }, attributes: ["moduleName"] });

const findKLHModuleById = async id => await MODULE.findOne({ where: { moduleId: id }, attributes: ["moduleName"] });

const findImpact = async impact => await IMPACT.findOne({ where: { catId: impact }, attributes: ["affectionName"] });

const findCategories = async problemType => await CATEGORIES.findOne({ where: { catId: problemType }, attributes: ["catName", "catId"] });

const findStatusById = async id => await STATUS.findOne({ where: { statusId: id }, attributes: ["statusName"]});

const findCloseStatus = async id => await CLOSE_STATUS.findOne({ where: { statusId: id }, attributes: ["statusName"]});

const findStateById = async srId => await STATE.findOne({ where: { srId: srId } });

module.exports = {
  findKLHModule,
  findImpact,
  findCategories,
  findASRById,
  findStatusById,
  findKLHModuleById,
  findCloseStatus,
  findStateById
};
