const findAllClosedASR = async (req, res) => {
  const { findUserById } = require('../../shared/user-querrys');
  const { responseHandler } = require('../../shared/response-handler');
  const { remap } = require('./remap-data');
  const { id: userId } = req;
  const status = 3;
    try {    
      const authUser = await findUserById(userId);    
      if (authUser.role === 1 || authUser.role === 2 || authUser.role === -1) {
        responseHandler(res, 200, { serviceReq: await remap(status)})
      } else {
        responseHandler(res, 200, { serviceReq: await remap(status, authUser.email)})
      }     
     } catch (err) {
      responseHandler(res, 500, { message: err.message });
    }
  }

  module.exports = { findAllClosedASR };