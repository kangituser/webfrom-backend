const _user = require("./user-helpers/index");
const _pwd = require('./password-helpers/index');
const enums = require('./mail/states');
const sendEmail = require('./massage-routelet');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      let users = await _user.getAllUsers();
      res.status(200).send({ users });
    } catch (err) {
      next(err);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { id } = req;
      const roles = [1 ,-1];
      
      const role = await _pwd.findUserRoleById(id);
      
      if (!roles.includes(role.role)) {
        return res.status(422).send({ message: "unauthorized user" })
      }
      
      const { userId } = req.body;
      const email = await _pwd.findUserEmailById(userId);

      if (!email.email) {
        return res.status(401).send({ message: 'user to delete does not exits' });
      }
      
      await _user.deleteUserAndUserToken(email.email, userId);
      return res.status(201).send({ message: "user deleted successfully" })
    } catch (err) {
      next(err);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { id } = req;
      const { role, email, fullName, isActive, phoneNumber, id: userId } = req.body.user;
      const roles = [1,-1];
      const { userRole } = await _user.getUserRole(id);
      
      if (!roles.includes(userRole)) {
        return res.status(422).send({ message: "unauthorized user" });
      }
      const user = await _pwd.findUserById(userId);

      if (!user) {
        return res.status(404).send({ message: "user does not exist" });
      }

        const userToUpdate = _user.mapUserToUpdate(role, email, fullName, isActive, phoneNumber);
        await _user.editUser(user.id, userToUpdate);
        
        if (user.isActive == 0 && userToUpdate.isActive == 1) {
          const userEmail = await _pwd.findUserEmailById(userId);
          sendEmail({...userToUpdate, email: [userEmail.email, userToUpdate.email]}, enums.USER, enums.userActivated);
        }
      
      return res.status(201).send({ message: `${fullName} successfully updated` })
    } catch (err) {
      next(err);
    }
  },

  getRole: async (req, res, next) => {
    try {
      let { id } = req.body;
      let role = await _user.getUserRole(id);
      return res.status(200).send(role);
    } catch (err) {
      next(err);
    }
  },
};
