const Reset = async (req, res) => {
    const { messageRoutelet } = require('../../mail/massage-routelet');
    const { responseHandler } = require('../shared/response-handler');
    const { findSingleUserByEmail } = require('../shared/user-querrys');
    const { hashPassword } = require('../shared/pwd-querrys')
    const { findUnexpiredTokenByEmail } = require('../shared/pwd-token-querrys');
    const { email, password: pwd, token } = req.body;
    const { originalUrl: route } = req.originalUrl;
    try {
      const tokenData = await findUnexpiredTokenByEmail(email);
      if (tokenData) {
        if (tokenData.token === token) {
          const hash = await hashPassword(pwd);
          const user = await findSingleUserByEmail(email);
          
          user.password = hash;
          await user.save();
  
          messageRoutelet({ name: user.fullName, email: user.email }, route, pwd, 'success');
          responseHandler(res, 201, { message: 'password updated' })
        } else {
          responseHandler(res, 422, { message: 'could not update password with this token' })
        }
      } else {
        responseHandler(res, 422, { message: 'could not update password with this token' })
      }
    } catch (err) {
      responseHandler(res, 500, { message: err.message })
    }
  };

module.exports = { Reset };