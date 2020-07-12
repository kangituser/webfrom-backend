const findAllOpenASR = async (req, res) => {
  const { responseHandler } = require('../../shared/response-handler');
  const { findUserById } = require('../../shared/user-querrys');
  const { remap } = require('./remap-data');
  const { id } = req;
  const status = [1,2,4,5,6];
    try {    
      const authUser = await findUserById(id);    
      if (authUser.role === 1 || authUser.role === 2 || authUser.role === -1) {
        responseHandler(res, 200, { serviceReq: await remap(status) });
      } else {
        responseHandler(res, 200, { serviceReq: await remap(status, authUser.email) });
      }          
    } catch (err) {
      responseHandler(res, 500, { message: err.message });
    }
  }

  module.exports = { findAllOpenASR };