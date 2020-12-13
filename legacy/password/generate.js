const Generate = async (req, res) => {
    const { findUserByEmail } = require('../../controllers/shared/user-querrys');
    const { setTokenExpirationDate } = require('../../controllers/shared/token-querrys');
    const { responseHandler } = require('../../controllers/shared/response-handler');
    const { messageRoutelet } = require('../../mail/massage-routelet');
    const { findPWDTokenByEmail, createPWDToken } = require('../../controllers/shared/pwd-token-querrys');
    const { hashPassword } = require('../../controllers/shared/pwd-querrys');
    const { tokenGenerator } = require('../../controllers/shared/token-generator');
    const newToken = await tokenGenerator();
    const { email } = req.body;  
    const { originalUrl } = req;       
    
    try {
      const date = await setTokenExpirationDate();      
      const user = await findUserByEmail(email);                 
      const token = await findPWDTokenByEmail(email);      
      
      if (!token) {
        // if email does not exist
        const hash = await hashPassword(newToken);        
        const createdToken = await createPWDToken(hash, date, email)
        messageRoutelet({ name: user.fullName, email: [user.email], token }, originalUrl, newToken);
      } else {
        token.token = newToken;
        token.expirationDate = date;
        token.userEmail = email;
        await token.save();

        messageRoutelet({ name: user.fullName, email: [user.email], token }, originalUrl, newToken);
      }
      responseHandler(res, 201, { message: 'token generated successfully!' })
    } catch (err) {
      responseHandler(res, 500, { message: err.message })
    }
  };

  module.exports = { Generate };