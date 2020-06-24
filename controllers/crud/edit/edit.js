const editASR = async (req, res) => {
  const { responseHandler } = require('../../shared/response-handler');
  const { findUserById } = require('../../shared/user-querrys');
  const { editASRequest } = require('./edit-asr-request')
  const { id, originalUrl } = req;
  
  const user = await findUserById(id);
  if (user.role == 1 || user.role == 2 || user.role == -1) {
    editASRequest(req.body, user, originalUrl, res);
  } else {
    responseHandler(res, 422, { message: "unauthorized user " })
  }
};

module.exports = { editASR };