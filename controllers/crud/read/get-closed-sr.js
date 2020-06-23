const findAllClosedASR = async (userId, res) => {
    const { findAllClosedASRs, findAllClosedASRsByEmail } = require('../../shared/sr-querrys');
    const { findUserById } = require('../../shared/user-querrys');
    const { responseHandler } = require('../../shared/response-handler');
    const { remapData } = require('./map-data');
    const { mergeBLOBwithASR } = require('./mergeWithBlob');
    let asr;
    try {    
      const authUser = await findUserById(userId);    
      if (authUser.role === 1 || authUser.role === 2) {
        asr = await findAllClosedASRs();     
      } else {
        asr = await findAllClosedASRsByEmail(authUser.email);     
      }     
      responseHandler(res, 200, { serviceReq: await mergeBLOBwithASR(await remapData(asr)) });
    } catch (err) {
      responseHandler(res, 500, { message: err.message });
    }
  }

  module.exports = { findAllClosedASR };