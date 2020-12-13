const TOKEN = require("../../models/token");
const USER = require("../../models/user");
const user = require("../../routes/user");

module.exports = {
  getUserRole: async id => {
    try {
      return await USER.findOne({ where: { id }, attributes: ["role"] });
    } catch (err) {
      next(err);
    }
  },

  getAllUsers: async () => {
    try {
      return await USER.findAll({ order: [["id", "DESC"]]});
    } catch(err) {
      next(err);
    }
  },

  deleteUserAndUserToken: async (userEmail, id) => {
    try {
        await TOKEN.destroy({ where: { userEmail }});
        await USER.destroy({ where: { id }});
    } catch (err) {
      next(err);
    }
  },

  mapUserToUpdate: (role, email, fullName, isActive, phoneNumber) => {
    try {
      return { role, email, fullName, isActive, phoneNumber };
    } catch (err) {
      next(err);
    }
  },

  editUser: async (id, userToUpdate) => {
    try {
      await USER.update({ ...userToUpdate }, { where: { id }})
    } catch (err) {
      next(err);
    }
  }
};
