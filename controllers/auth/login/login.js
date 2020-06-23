const Login = async ( req, res) => {
  
  const { email, password } = req.body;
  const { findTokenByEmail } = require('../../shared/token-querrys');
  const { comparePassowrds } = require('../../shared/pwd-querrys');
  const { responseHandler } = require('../../shared/response-handler');
  const { findUserByEmail } = require('../../shared/user-querrys');
  const { loginJWTToken } = require('./login-jwt-token');
  
  try {
    const user = await findUserByEmail(email);
    const { id, isActive, password: pwd, role } = user;
    const [tokenData] = await findTokenByEmail(email);
    const pwdsAreEqual = await comparePassowrds(password, pwd);
    const token = loginJWTToken(id);
    
    if (user && isActive === true) {
      if (pwdsAreEqual) {
        responseHandler(res, 201, { auth: true, token: token, expirationDate: tokenData.expirationDate , role: role })
      } else {
        responseHandler(res, 401, { auth: false, token: null, message: 'incorrect password'})
      }
    } else {
      responseHandler(res, 404, { message: 'user not active or does not exist' })
    }      
  } catch (err) {
    responseHandler(res, 500, { message: err.message })
  }
};

module.exports = { Login };