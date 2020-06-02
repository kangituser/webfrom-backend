const ASR = require('../../models/ASR');
const BLOB = require('../../models/Blob');
const STATE = require('../../models/state');
const IMPACT = require('../../models/impact');
const MODULE = require('../../models/klhmodules');
const CATEGORIES = require('../../models/categories');
const  { mainCatRouter } = require('./cat-router');
const { findUserById } = require('../../shared/query-store');
const mail = require('../../mail/massage-routelet');

const ASRcreation = async asrToCreate => {
  const klh_module = await MODULE.findOne({ where: { moduleId: asrToCreate.klhModule }, attributes: ['moduleName']});
  const impact = await IMPACT.findOne({ where: { catId: asrToCreate.impact } });
  const main = await CATEGORIES.findOne({ where: { catId: asrToCreate.problemType }});  
  const sub = await mainCatRouter(main.catId, asrToCreate.problemSubType);
  
  return await ASR.create({
    problem_type: main.catName,
    problem_sub_type: sub,
    title: asrToCreate.title,
    name_open: asrToCreate.name,
    id_open: asrToCreate.idOpen,
    email_open: asrToCreate.email,
    phone_open: asrToCreate.phone,
    description: asrToCreate.description,
    impact: asrToCreate.impact,
    impact_name: impact.affectionName,
    sr_cust_module: asrToCreate.klhModule,
    module_klh_name: klh_module.moduleName,
    status: 1,
    status_name: 'חדש',
    update_time: new Date(),
  });
}

const createBlob = async (asrId, blobName, containerName) => {
  await BLOB.create({
    srId: asrId,
    blobName: blobName,
    containerName: containerName,
    blobServer: 1,
  });
}

const createState = async asrId => {
  await STATE.create({
    srId: asrId,
    syncStatus: 0,
    syncStatusName: 'waiting insert sync',
    syncUpdated: new Date(),
  });
}

const createASRequest = async ({ id, body, originalUrl }, res) => {  
  const authUser = await findUserById(id);
  const ASRToCreate = {
    problemType: body.mainCategory,
    problemSubType: body.subCategory,
    title: body.title,
    name: authUser.fullName,
    email: authUser.email,
    phone: authUser.phoneNumber,
    description: body.description,
    impact: body.impact,
    klhModule: body.klhModule,
    blobName: body.blobName,
    containerName: body.containerName,
    idOpen: id
  }
  try {
    const asr = await ASRcreation(ASRToCreate);        
    await createBlob(asr.id, body.blobName, body.containerName);
    await createState(asr.id);
    mail.messageRoutelet({ srId: asr.id, email: authUser.email, main: asr.problem_type, sub: asr.problem_type, title: asr.title, description: asr.description, name: authUser.fullName, impact: asr.impact_name, klhModule: asr.module_klh_name }, originalUrl)
    res.status(201).send({ message: 'success' });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
}

module.exports = { createASRequest };