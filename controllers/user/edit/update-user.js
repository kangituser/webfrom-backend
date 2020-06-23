const Update = async (req, res) => {
    
    const { responseHandler } = require('../../shared/response-handler');
    const { findUserById } = require('../../shared/user-querrys');
    const { EditUser } = require('./edit-user');
    
    const { originalUrl, id } = req;
    const { role, email, fullName, isActive, phoneNumber, id: userId } = req.body.user;

    const USERToUpdate = {
      userRole: role,
      email: email,
      name: fullName,
      active: isActive,
      phone: phoneNumber
    }
  
    try {
      const loggedIn = await findUserById(id);
      if (loggedIn.role === 1) {
        const user = await findUserById(userId);
        if (user) {
          await EditUser(user, USERToUpdate, originalUrl);        
          responseHandler(res, 201, { message: `${USERToUpdate.name} successfully updated` });
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