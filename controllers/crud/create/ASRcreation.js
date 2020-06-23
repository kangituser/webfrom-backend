const ASRcreation = async asrToCreate => {
  
  const { findKLHModule, findImpact, findCategories } = require('../../shared/sr-querrys');
  const { mainCatRouter } = require('../cat-router');
  const ASR = require('../../../models/ASR');
  
  const { klhModule, impact, problemType, problemSubType, title, name, idOpen, email, phone, description } = asrToCreate;
  const klh_module = await findKLHModule(klhModule);
  const impact = await findImpact(impact);
  const main = await findCategories(problemType);  
  const sub = await mainCatRouter(main.catId, problemSubType);
  
  return await ASR.create({
    problem_type: main.catName,
    problem_sub_type: sub,
    title: title,
    name_open: name,
    id_open: idOpen,
    email_open: email,
    phone_open: phone,
    description: description,
    impact: impact,
    impact_name: impact.affectionName,
    sr_cust_module: klhModule,
    module_klh_name: klh_module.moduleName,
    status: 1,
    status_name: 'חדש',
    update_time: new Date()
  });
}

module.exports = { ASRcreation };