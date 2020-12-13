const TOKEN = require("../../models/token");
const USER = require("../../models/user");
const cell = require("./cell");

module.exports = {
  findUserByEmail: async email => {
    try {
      return await USER.findOne({ where: { email } });
    } catch (err) {
      next(err);
    }
  },

  findTokenByUserEmail: async userEmail => {
    try {
      return await TOKEN.findOne({
        where: { userEmail },
        attributes: ["expirationDate"],
      });
    } catch (err) {
      next(err);
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
      next(err);
    }
  },

  createUser: async (hash, user) => {
    try {
      return await USER.create({
        email: user.email,
        password: hash,
        fullName: user.fullName,
        isActive: 0,
        role: 3,
        phoneNumber: cell(user.phoneNumber),
      });
    } catch (err) {
      next(err);
    }
  },
};
