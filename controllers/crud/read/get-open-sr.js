const findAllOpenASR = async (req, res) => {
  const { responseHandler } = require('../../shared/response-handler');
  const { findUserById } = require('../../shared/user-querrys');
  const { remap } = require('./remap-data');
  const { id } = req;
  const status = [1,2,4,5,6];
  const roles = [1,2,-1];
    try {    
      const { email, role } = await findUserById(id);    
      if (roles.includes(role)) {
        responseHandler(res, 200, { serviceReq: await remap(status) });
      } else {
        responseHandler(res, 200, { serviceReq: await remap(status, email) });
      }          
    } catch (err) {
      responseHandler(res, 500, { message: err.message });
    }
  }

  module.exports = { findAllOpenASR };