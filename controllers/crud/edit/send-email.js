const sendASRDeitedMail = async (updatedASR, authUser, ASRtoUpdate, isChanged, route, processed, closed) => {
  const { messageRoutelet } = require('../../../mail/massage-routelet');
  const ASR = require('../../../models/ASR');

  
  const { id, problem_type, problem_sub_type, module_klh_name, title, description, impact_name, status_name  } = updatedASR;
  const { closeStatusName } = ASRtoUpdate;
  try {
  const { email_open } = await ASR.findOne({ where: { id: id }, attributes: ["email_open"], raw: true });
  let emails;
  
  if (authUser.email != email_open) {
    emails = [email_open, authUser.email];
  } else {
    emails = [email_open];
  }

  console.log(email_open)
    messageRoutelet({
      srId: id,
      category: problem_type,
      subCategory: problem_sub_type,
      status: status_name,
      module: module_klh_name,
      title: title,
      description: description,
      email: emails,
      name: authUser.fullName,
      impact: impact_name,
      isChanged: isChanged,
      updated: processed,
      closed: closed,
      closeStatusName: closeStatusName
    }, route);
  } catch (err) {
    console.log(err)
  }
};

  module.exports = { sendASRDeitedMail };