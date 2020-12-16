const TOKEN = require("../../models/token");
const USER = require("../../models/user");
const cell = require("./cell");

module.exports = {
  findUserByEmail: async email => {
    try {
      return await USER.findOne({ where: { email } });
    } catch (err) {
      throw err;
    }
  },

  findTokenByUserEmail: async userEmail => {
    try {
      return await TOKEN.findOne({
        where: { userEmail },
        attributes: ["expirationDate"],
      });
    } catch (err) {
      throw err;
    }
  },

  findAllAdmins: async () => {
    try {
      let admins = await USER.findAll({
        where: { role: 1 },
        attributes: ["email"],
        raw: true,
      });

      return admins.map(admin => admin.email);
    } catch (err) {
      throw err;
    }
  },

  createUser: async (password, { email, fullName, phoneNumber }) => {
    try {
      return await USER.create({
        email,
        password,
        fullName,
        isActive: 0,
        role: 3,
        phoneNumber: cell(phoneNumber),
      });
    } catch (err) {
      throw err;
    }
  },
};
