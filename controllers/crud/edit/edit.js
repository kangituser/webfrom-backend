const editASR = async (req, res) => {
  const { responseHandler } = require('../../shared/response-handler');
  const { findUserById } = require('../../shared/user-querrys');
  const { editASRequest } = require('./edit-asr-request')
  const { id, originalUrl } = req;
  const roles = [1, 2, -1]; 
  
  const user = await findUserById(id);
  if (roles.includes(user.role)) {
    editASRequest(req.body, user, originalUrl, res);
  } else {
    responseHandler(res, 422, { message: "unauthorized user " })
  }
};

module.exports = { editASR };