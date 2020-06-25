const sendASRDeitedMail = async (updatedASR, authUser, ASRtoUpdate, isChanged, route, processed, closed) => {
  const { messageRoutelet } = require('../../../mail/massage-routelet');
  
  const { id, problem_type, problem_sub_type, module_klh_name, title, description, impact_name, status_name  } = updatedASR;
  const { closeStatusName } = ASRtoUpdate;    
    messageRoutelet({
      srId: id,
      category: problem_type,
      subCategory: problem_sub_type,
      status: status_name,
      module: module_klh_name,
      title: title,
      description: description,
      email: authUser.email,
      name: authUser.fullName,
      impact: impact_name,
      isChanged: isChanged,
      updated: processed,
      closed: closed,
      closeStatusName: closeStatusName
    }, route);
  };

  module.exports = { sendASRDeitedMail };