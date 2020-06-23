const Delete = async (req , res) => {
    const { responseHandler } = require('../shared/response-handler');
    const { findUserTokensByEmail } = require('../shared/token-querrys');
    const { findUserById } = require('../shared/user-querrys');
    
    const { user: userId } = req.body;
    const { id } = req;
    console.log(userId);
    console.log(id);
    
     try {
      const loggedIn = await findUserById(id);

      if (loggedIn.role === 1) {
        const user = await findUserById(userId);      
        const tokens = await findUserTokensByEmail(user.email);
        
        tokens.forEach(token => token.destroy());
        await user.destroy();

        responseHandler(res, 201, { message: `user deleted successfully` });
      } else {
        responseHandler(res, 422, { message: "unauthorized user" });
      }
    } catch (err) {
      responseHandler(res, 500, { message: err.message });
    }
  };

module.exports = { Delete };