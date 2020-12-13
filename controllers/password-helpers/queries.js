const { Op } = require("sequelize");
const PWDTOKEN = require("../../models/pwdToken");
const USER = require("../../models/user");

module.exports = {
  findUserById: async id => {
    try {
      return await USER.findOne({ where: { id }, raw: true });
    } catch (err) {
      next(err);
    }
  },

  updateUserPassword: async (hash, id) => {
    try {
      await USER.update({ password: hash }, { where: { id } });
    } catch (err) {
      next(err);
    }
  },

  findUnexpiredTokenByEmail: async userEmail => {
    try {
      return await PWDTOKEN.findOne({
        where: { userEmail, expirationDate: { [Op.gte]: new Date() } },
      });
    } catch (err) {
      next(err);
    }
  },

  setTokenExpirationDate: async () => {
    try {
      return new Date().setMinutes(new Date().getMinutes() + 30);
    } catch (err) {
      next(err);
    }
  },

  findPWDTokenByEmail: async userEmail => {
    try {
      return await PWDTOKEN.findOne({ where: { userEmail } });
    } catch (err) {
      next(err);
    }
  },

  createPWDToken: async (token, expirationDate, userEmail) => {
    try {
      return await PWDTOKEN.create({ token, expirationDate, userEmail });
    } catch (err) {
      next(err);
    }
  },

  updatePWDToken: async (id, token, expirationDate, userEmail) => {
    try {
      return await PWDTOKEN.update(
        { token, expirationDate, userEmail },
        { where: { id } }
      );
    } catch (err) {
      next(err);
    }
  },
};
