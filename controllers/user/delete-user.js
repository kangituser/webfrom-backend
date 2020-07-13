const Delete = async (req , res) => {
    const { responseHandler } = require('../shared/response-handler');
    const { findUserById } = require('../shared/user-querrys');
    const TOKEN = require('../../models/token');
    const USER = require('../../models/user');
    
    const { userId } = req.body;
    const { id } = req;
    const roles = [1, -1];
    
     try {
      const { role } = await findUserById(id);

      if (roles.includes(role)) {
      const { email } = await findUserById(userId);      

        await TOKEN.destroy({ where: { userEmail: email }});
        await USER.destroy({ where: { id: userId }});

        responseHandler(res, 201, { message: `user deleted successfully` });
      } else {
        responseHandler(res, 422, { message: "unauthorized user" });
      }
    } catch (err) {
      responseHandler(res, 500, { message: err.message });
    }
  };

module.exports = { Delete };