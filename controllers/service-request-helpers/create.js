const ASR = require("../../models/ASR");
const BLOB = require("../../models/Blob");
const STATE = require("../../models/state");
const USER = require("../../models/user");

const categoryRouter = require("./category-router");
const _queries = require('./queries');


module.exports = {
  setStateToCreate: async srId => {
    try {
      await STATE.create({
        srId,
        syncStatus: 0,
        syncStatusName: "waiting insert sync",
        syncUpdated: new Date(),
      });
    } catch (err) {
      throw err;
    }
  },

  createBlob: async (srId, blobName, containerName) => {
    try {
      await BLOB.create({
        srId,
        blobName,
        containerName,
        blobServer: 1,
      });
    } catch (err) {
      throw err;
    }
  },

  mapServiceRequest: (sr, idOpen, authUser) => {
    try {
      return {
        problemType: sr.mainCategory,
        problemSubType: sr.subCategory,
        title: sr.title,
        name: authUser.fullName,
        email: authUser.email,
        phone: authUser.phoneNumber,
        description: sr.description,
        impact: sr.impact,
        klhModule: sr.klhModule,
        blobName: sr.blobName,
        containerName: sr.containerName,
        idOpen
      };
    } catch (err) {
      throw err;
    }
  },

  findKLHEmails: async role => {
    try {
      let emails = await USER.findAll({ where: { role }, attributes: ['email'], raw: true })  
      return emails.map(klh => klh.email);
    } catch (err) {
      throw err;
    }
  },

  createServiceRequest: async sr => {
    try {
      const module_klh_name = await _queries.findKLHModule(sr.klhModule);
      const impact_name = await _queries.findImpact(sr.impact);
      const { catName } = await _queries.findCategories(sr.problemType);
      const { catName: subCatName } = await categoryRouter(sr.problemType, sr.problemSubType);

      return await ASR.create({
        problem_type: catName,
        problem_sub_type: subCatName || null,
        title: sr.title,
        name_open: sr.name,
        id_open: sr.idOpen,
        email_open: sr.email,
        phone_open: sr.phone,
        description: sr.description,
        impact: sr.impact,
        impact_name,
        sr_cust_module: sr.klhModule,
        module_klh_name,
        status: 1,
        insert_time: new Date(),
        status_name: 'חדש',
        update_time: new Date(),
        dateToIssue: new Date().setHours(new Date().getHours() + 4) 
      });
    } catch (err) {
      throw err;
    }
  },
};
