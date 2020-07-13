const Update = async (req, res) => {
  
  const { responseHandler } = require("../shared/response-handler");
  const { messageRoutelet } = require("../../mail/massage-routelet");
  const { findUserById } = require("../shared/user-querrys");
  const { hashPassword } = require('../shared/pwd-querrys')
  
  const { password, id: userId } = req.body;
  const { id, originalUrl } = req;
  const roles = [1,-1];

  try {
    const { role } = await findUserById(id);
    const hash = await hashPassword(password);
    if (roles.includes(role)) {
      const user = await findUserById(userId); 

      if (user) {
        user.password = hash;
        await user.save();

        messageRoutelet({ name: user.fullName, email: user.email }, originalUrl, password, "success");
        responseHandler(res, 201, { message: "password was successfully updated" });
      } else {
        responseHandler(res, 404, { message: "used does not exist" });
      }
    } else {
      responseHandler(res, 422, { message: "unauthorized user" });
    }
  } catch (err) {
    responseHandler(res, 500, { message: err.message });
  }
};

module.exports = { Update };