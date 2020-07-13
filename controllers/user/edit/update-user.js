const Update = async (req, res) => {
    
    const { responseHandler } = require('../../shared/response-handler');
    const { findUserById } = require('../../shared/user-querrys');
    const { EditUser } = require('./edit-user');
    
    const { originalUrl, id } = req;
    const { role, email, fullName, isActive, phoneNumber, id: userId } = req.body.user;
    const roles =[1,-1];
    
    const USERToUpdate = {
      role: role,
      email: email,
      fullName: fullName,
      isActive: isActive,
      phoneNumber: phoneNumber
    }
  
    try {
      const { role } = await findUserById(id);
      if (roles.includes(role)) {
        const user = await findUserById(userId);
        if (user) {
          await EditUser(user, USERToUpdate, originalUrl);        
          responseHandler(res, 201, { message: `${fullName} successfully updated` });
        } else {
          responseHandler(res, 404, { message: "user does not exist" });
        }
      } else {
        responseHandler(res, 422, { message: "unauthorized user" });
      }
    } catch (err) {
        responseHandler(res, 500, { message: err.message });
    }
  };

  module.exports = { Update };