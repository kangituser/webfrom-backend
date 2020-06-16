const TOKEN = require("../../models/token");
const USER = require("../../models/user");
const { findUserById, findUserRoleById } = require("../../shared/query-store");
const { messageRoutelet } = require('../../mail/massage-routelet')
 
const responseHandler = (res, status, obj) => res.status(status).send(obj);

const GetAll = async (req, res, next) => {
  try {
    const users = await USER.findAll();
    users.sort((a,b) => b.id - a.id)

    responseHandler(res, 200,{ users: users })
  } catch (err) {
    responseHandler(res, 500,{ message: err.message })
  }
};

const Update = async (req, res, next) => {
  const USERToUpdate = {
    userRole: req.body.user.role,
    email: req.body.user.email,
    name: req.body.user.fullName,
    active: req.body.user.isActive,
    phone: req.body.user.phoneNumber
  }
  let status, message;
  const originalUrl = req.originalUrl;

  try {
    const loggedIn = await findUserById(req.id);
    if (loggedIn.role === 1) {
      const user = await findUserById(req.body.user.id);
      if (user) {
        await EditUser(user, USERToUpdate, originalUrl);        
        status = 201;
        message = `${USERToUpdate.name} successfully updated`;
      } else {
        status = 404;
        message = "user does not exist";
      }
    } else {
      status = 422;
      message = "unauthorized user";
    }
  } catch (err) {
    status = 500;
    message = err.message;
  }
  responseHandler(res, status, { message: message });
};

const Delete = async ({ id, body: { userId }}, res, next) => {
  let status;
  let message;
   try {
    const loggedIn = await findUserById(id);
    if (loggedIn.role === 1) {
      const user = await findUserById(userId);      
      const tokens = await TOKEN.findAll({ where: { userEmail: user.email } });
      tokens.forEach((token) => {
        token.destroy();
      });
      await user.destroy();
      status = 201;
      message = `user deleted successfully`;
    } else {
      status = 422;
      message = "unauthorized user";
    }
  } catch (err) {
    status = 500;
    message = err.message;
  }
  responseHandler(res, status, { message: message });
};

const GetRole = async ({ id }, res, next) => responseHandler(res, 200, await findUserRoleById(id));

const EditUser = async (user, USERToUpdate, originalUrl) => {
  user.email = USERToUpdate.email;
  user.fullName = USERToUpdate.name;
  user.isActive = USERToUpdate.active;
  user.role = USERToUpdate.userRole;
  user.phoneNumber = USERToUpdate.phone;
  const edited = await user.save()
  if (USERToUpdate.isActive != 0) {
    messageRoutelet(USERToUpdate, originalUrl , null, 'activated');
  }
  return edited;
}

module.exports = { Update, Delete, GetAll, GetRole };