
const ASRcreation = async asrToCreate => {
  const ASR = require('../../../models/ASR');
  
  const { findKLHModule, findImpact, findCategories } = require('../../shared/sr-querrys');
  const { mainCatRouter } = require('../cat-router');
  
  const { klhModule, impact, problemType, problemSubType, title, name, idOpen, email, phone, description } = asrToCreate;
  const { moduleName } = await findKLHModule(klhModule);
  const { affectionName } = await findImpact(impact);  
  const { catName } = await findCategories(problemType);      
  const { catName: subCatName } = await mainCatRouter(problemType, problemSubType); 
  
  return await ASR.create({
    problem_type: catName,
    problem_sub_type: subCatName || null,
    title: title,
    name_open: name,
    id_open: idOpen,
    email_open: email,
    phone_open: phone,
    description: description,
    impact: impact,
    impact_name: affectionName,
    sr_cust_module: klhModule,
    module_klh_name: moduleName,
    status: 1,
    insert_time: new Date(),
    status_name: 'חדש',
    update_time: new Date(),
    dateToIssue: new Date().setHours(new Date().getHours() + 4) 
  });
}

module.exports = { ASRcreation };