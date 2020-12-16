const ASR = require("../../models/ASR");
const LOG = require("../../models/Change_log");
const STATE = require("../../models/state");
const STATUS = require('../../models/status');
const CLOSE_STATUS = require("../../models/close-status");
const mainCategoryRouter = require("./category-router");
const _serviceRequest = require("./index");
const _create = require('./create');
const enums = require('../mail/states');
const sendEmail = require('../massage-routelet');

module.exports = {
  setStateToEdit: async srId => {
    try {
      return await STATE.create({
        srId,
        syncStatus: 2,
        syncStatusName: "waiting update sync",
        syncUpdated: new Date(),
      });
    } catch (err) {
      throw err;
    }
  },

  updateStatetoError: async state => {
    try {
      await STATE.update(
        {
          syncStatus: 6,
          syncStatusName: "error",
          syncUpdated: new Date(),
        },
        { where: { id: state.id } }
      );
    } catch (err) {
      throw err;
    }
  },

  updateStateToEdit: async state => {
    try {
      await STATE.update(
        {
          syncStatus: 2,
          syncStatusName: "waiting update sync",
          syncUpdated: new Date(),
        },
        { where: { id: state.id } }
      );
    } catch (err) {
      throw err;
    }
  },

  findServiceRequestById: async id => {
    try {
      return await ASR.findOne({ where: { id } });
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

  getStatusName: async statusId => {
    try {
      if (!statusId) {
        return null;
      }

      const { statusName: nameOfStatus } = await STATUS.findOne({
        where: { statusId },
        attributes: ["statusName"],
      });
      return nameOfStatus;
    } catch (err) {
      throw err;
    }
  },

  getCloseStatus: async statusId => {
    try {
      let { closeStatusName } = await CLOSE_STATUS.findOne({
        where: { statusId },
        attributes: [["statusName", "closeStatusName"]],
        raw: true
      });
      return closeStatusName;
    } catch (err) {
      throw err;
    }
  },

  getSubCategoryName: async (catId, subCategory) => {
    try {
      if (!subCategory) {
        return null;
      }
      const { catName: subCatName } = await mainCategoryRouter(catId, subCategory);
      return subCatName;
    } catch (err) {
      throw err;
    }
  },

  sendToLog: async (old_value, new_value, edited_by, srId) => {
    try {
      await LOG.create({
        old_value,
        new_value,
        date_edited: new Date(),
        edited_by,
        srId,
      });
    } catch (err) {
      throw err;
    }
  },

  sendServiceRequestEditedEmail: async (
    serviceRequest,
    status,
    user,
  ) => {
    try {
      const {
        id,
        problem_type,
        problem_sub_type,
        module_klh_name,
        title,
        description,
        impact_name,
        status_name,
        closeStatusName,
      } = serviceRequest;
      const { email_open } = await ASR.findOne({
        where: { id },
        attributes: ["email_open"],
        raw: true,
      });
      const klhEmails = await _create.findKLHEmails(2);
      
      let updated = false;
      let closed = false;
      switch (status) {
        case 2: 
          updated = true;
          closed = false;
          break;
        case 3: 
          updated = false;
          closed = true;
          break;
        default: 
          updated = false;
          closed = false;
          break;
      }

      let email = user.email != email_open ? [email_open, user.email, ...klhEmails] : [email_open, ...klhEmails];
      let serviceRequestForMail = {
          srId: id,
          category: problem_type,
          subCategory: problem_sub_type,
          status: status_name,
          module: module_klh_name,
          title,
          email,
          description,
          name: user.fullName,
          impact: impact_name,
          isChanged: true,
          updated,
          closed,
          closeStatusName
        }
      
        return serviceRequestForMail;
    } catch (err) {
      throw err;
    }
  },
};
