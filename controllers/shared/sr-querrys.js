const ASR = require("../../models/ASR");
const MODULE = require('../../models/klhmodules');
const IMPACT = require('../../models/impact');
const CATEGORIES = require('../../models/categories');
const STATUS = require('../../models/status');
const CLOSE_STATUS = require('../../models/close-status');
const STATE = require('../../models/state');
const { Op } = require("sequelize");

const findAllOpenASRs = async status => await ASR.findAll({ where: { status: status }, raw: true, order: [["id", "DESC"]], });

const findAllOpenASRsByEmail = async (status, email) => ASR.findAll({ where: { email_open: { [Op.eq]: email }, status: status, }, raw: true, order: [["id", "DESC"]] });

const findAllClosedASRs = async () => await ASR.findAll({ where: { status: { [Op.eq]: 3, } }, raw: true, order: [["id", "DESC"]] });

const findAllClosedASRsByEmail = async email => ASR.findAll({ where: { email_open: { [Op.eq]: email }, status: status, }, raw: true, order: [["id", "DESC"]] });

const findASRById = async id => await ASR.findOne({ where: { id: id } }); 

const findKLHModule = async KLHModule => await MODULE.findOne({ where: { moduleId: KLHModule }, attributes: ['moduleName']});

const findKLHModuleById = async id => await MODULE.findOne({ where: { moduleId: id }});

const findImpact = async impact => await IMPACT.findOne({ where: { catId: impact } });

const findCategories = async problemType => await CATEGORIES.findOne({ where: { catId: problemType }});

const findStatusById = async id => await STATUS.findOne({ where: { statusId: id } });

const findCloseStatus = async id => await CLOSE_STATUS.findOne({ where: { statusId: id }});

const findAllClosedStatuses = async () => await CLOSE_STATUS.findAll({ where: { status: { [Op.eq]: 3 }, raw: true }});

const findStateById = async srId => await STATE.findOne({ where: { srId: srId } });

module.exports = { 
    findAllOpenASRs, 
    findAllOpenASRsByEmail,
    findAllClosedASRs,
    findAllClosedASRsByEmail,
    findKLHModule,
    findImpact,
    findCategories,
    findASRById,
    findStatusById,
    findKLHModuleById,
    findCloseStatus,
    findStateById,
    findAllClosedStatuses
};
