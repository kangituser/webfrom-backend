
const Register = async (req, res, next) => {  
   
    const { findUserByEmail, findAllAdmins } = require('../../controllers/shared/user-querrys');
    const { messageRoutelet } = require('../../mail/massage-routelet');
    const { responseHandler } = require('../../controllers/shared/response-handler');
    const { tokenGenerator } = require('../../controllers/shared/token-generator');
    const { hashPassword } = require('../../controllers/shared/pwd-querrys');
    const { cerateToken } = require('../../controllers/shared/token-querrys');
    const { createUser } = require('./create-user');
    const { password, email } = req.body;
    const { originalUrl } = req;
 
    try {
      const hash = await hashPassword(password);
      const user = await findUserByEmail(email);
      const token = await tokenGenerator();
      const expDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      
      if (!user) {
        const createdUser = await createUser(hash, req.body);
        const { fullName, email } = createdUser;
        const admins = await findAllAdmins();
        let adminEmails = admins.map((admins) => admins.email);

        messageRoutelet({ name: fullName, email: adminEmails }, originalUrl, null, 'waiting');
        await cerateToken(token, expDate, email);
        responseHandler(res, 201, { message: 'user created successfuly' });
      } else {
        responseHandler(res, 401, { message: 'user already exists' });
      }
    } catch (err) {
      responseHandler(res, 500, { message: err.message });
    }
  };

  module.exports = { Register };