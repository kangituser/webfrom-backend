const deleteASR = async (req, res) => {
  const { findUserById } = require('../../shared/user-querrys');
  const { responseHandler } = require('../../shared/response-handler')
  const { deleteASRequest } = require('./delete-asr-request');
  const { id } = req;
  const { srId } = req.body;
  const roles = [1, -1];
  const { role } = await findUserById(id);

  if (roles.includes(role)) {
    deleteASRequest(srId, res);
  } else {
    responseHandler(res, 422, { message: "unauthorized user " });

  }
};

module.exports = { deleteASR };