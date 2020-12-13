const BLOB = require("../../models/Blob");
const STATE = require("../../models/state");
const categoryRouter = require("./category-router");
const mainCatRouter = require('./category-router');

const _serviceRequest = require('./index');

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
        problemType: mainCategory,
        problemSubType: subCategory,
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

  findKLHUsers: async role => {
    try {
      return await USER.findAll({ where: { role }, raw: true})  
    } catch (err) {
      throw err;
    }
  },

  createServiceRequest: async sr => {
    try {
      const moduleName = await _serviceRequest.findKLHModule(sr.klhModule);
      const { affectionName } = await _serviceRequest.findImpact(sr.impact);
      const { catName } = await _serviceRequest.findCategories(sr.problemType);
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
        impact_name: affectionName,
        sr_cust_module: klhModule,
        module_klh_name: moduleName,
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
