const TOKEN = require("../../models/token");
const USER = require("../../models/user");

module.exports = {
  getUserRole: async id => {
    try {
      let userRole = await USER.findOne({ where: { id }, attributes: [["role", "userRole"]], raw: true });
      return userRole ? { ...userRole } : null;
    } catch (err) {
      throw err;
    }
  },

  getAllUsers: async () => {
    try {
      return await USER.findAll({ order: [["id", "DESC"]]});
    } catch(err) {
      throw err;
    }
  },

  deleteUserAndUserToken: async (userEmail, id) => {
    try {
        await TOKEN.destroy({ where: { userEmail }});
        await USER.destroy({ where: { id }});
    } catch (err) {
      throw err;
    }
  },

  mapUserToUpdate: (role, email, fullName, isActive, phoneNumber) => {
    try {
      return { role, email, fullName, isActive, phoneNumber };
    } catch (err) {
      throw err;
    }
  },

  editUser: async (id, userToUpdate) => {
    try {
      await USER.update({ ...userToUpdate }, { where: { id }})
    } catch (err) {
      throw err;
    }
  }
};
