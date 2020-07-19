const createASRequest = async (req, res) => {
  const { findUserById, findKLHUsers } = require("../../shared/user-querrys");
  const { messageRoutelet } = require("../../../mail/massage-routelet");
  const { responseHandler } = require("../../shared/response-handler");
  const { ASRcreation } = require('./ASRcreation');
  const { createBlob } = require('./create-blob');
  const { createState } = require('./create-state');
  const { id, originalUrl } = req;
  const { mainCategory, subCategory, title, description, impact, klhModule, blobName, containerName } = req.body;

  const authUser = await findUserById(id);
  const ASRToCreate = {
    problemType: mainCategory,
    problemSubType: subCategory,
    title: title,
    name: authUser.fullName,
    email: authUser.email,
    phone: authUser.phoneNumber,
    description: description,
    impact: impact,
    klhModule: klhModule,
    blobName: blobName,
    containerName: containerName,
    idOpen: id,
  };
  try {
    const klhUsers = await findKLHUsers();
    let klhEmails = klhUsers.map((user) => user.email);

    authUser.role == 3 ? klhEmails.unshift(authUser.email) : '';

    const asr = await ASRcreation(ASRToCreate);
    await createBlob(asr.id, blobName, containerName);
    await createState(asr.id);
    messageRoutelet(
      {
        srId: asr.id,
        email: klhEmails,
        main: asr.problem_type,
        sub: asr.problem_type,
        title: asr.title,
        description: asr.description,
        name: authUser.fullName,
        impact: asr.impact_name,
        klhModule: asr.module_klh_name,
      },
      originalUrl
    );
    responseHandler(res, 201, { message: "success" });
  } catch (err) {
    responseHandler(res, 500, { msg: err.message });
  }
};

module.exports = { createASRequest };