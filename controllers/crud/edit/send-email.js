const sendASRDeitedMail = async (updatedASR, authUser, ASRtoUpdate, isChanged, route, processed, closed) => {
  const { messageRoutelet } = require('../../../mail/massage-routelet');
  const { findKLHModuleById, findStatusById, findImpact } = require('../../shared/sr-querrys');
  const { klhModule, status, affection, id, problem_type, problem_sub_type, title, description, closeStatusName } = ASRtoUpdate;
  const klh_module = await findKLHModuleById(klhModule)
  const status = await findStatusById(status);
  const impact = await findImpact(affection);
    
    messageRoutelet({
      srId: updatedASR ? id: null,
      category: updatedASR ? problem_type: null,
      subCategory: updatedASR ? problem_sub_type: null,
      status: status.statusName,
      module: klh_module.moduleName,
      title: title,
      description: description,
      email: authUser.email,
      name: authUser.fullName,
      impact: impact.affectionName,
      isChanged: isChanged,
      updated: processed,
      closed: closed,
      closeStatusName: closeStatusName
    }, route);
  };

  module.exports = { sendASRDeitedMail };