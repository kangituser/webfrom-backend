const findAllOpenASR = async (req, res) => {
    const { findAllOpenASRs, findAllOpenASRsByEmail } = require('../../shared/sr-querrys');
    const { responseHandler } = require('../../shared/response-handler');
    const { findUserById } = require('../../shared/user-querrys');
    const { mergeBLOBwithASR } = require('./mergeWithBlob');
    const { remapData } = require('./map-data');
    const { id } = req;
    let asr;
    const status = [1,2,4,5,6];
    try {    
      const authUser = await findUserById(id);    
      if (authUser.role === 1 || authUser.role === 2) {
        asr = await findAllOpenASRs(status);     
      } else {
        asr = await findAllOpenASRsByEmail(status, authUser.email);     
      }          
      responseHandler(res, 200, { serviceReq: await mergeBLOBwithASR(await remapData(asr)) });
    } catch (err) {
      responseHandler(res, 500, { message: err.message });
    }
  }

  module.exports = { findAllOpenASR };