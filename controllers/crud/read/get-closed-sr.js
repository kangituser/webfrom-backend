const findAllClosedASR = async (req, res) => {
  const { findUserById } = require('../../shared/user-querrys');
  const { responseHandler } = require('../../shared/response-handler');
  const { remap } = require('./remap-data');
  const { id: userId } = req;
  const status = 3;
  const roles = [1,2,-1];
    try {    
      const { role, email } = await findUserById(userId);   
      if (roles.includes(role)) {
        responseHandler(res, 200, { serviceReq: await remap(status)})
      } else {
        responseHandler(res, 200, { serviceReq: await remap(status, email)})
      }     
     } catch (err) {
      responseHandler(res, 500, { message: err.message });
    }
  }

  module.exports = { findAllClosedASR };