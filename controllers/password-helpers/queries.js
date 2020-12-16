const { Op } = require("sequelize");
const PWDTOKEN = require("../../models/pwdToken");
const USER = require("../../models/user");

module.exports = {
  findUserById: async id => {
    try {
      return await USER.findOne({
        where: { id },
        raw: true,
      });
    } catch (err) {
      throw err;
    }
  },

  findUserRoleById: async id => {
    try {
      return await USER.findOne({
        where: { id },
        attributes: ["role"],
        raw: true,
      });
    } catch (err) {
      throw err;
    }
  },
  
  findUserEmailById: async id => {
    try {
      let email = await USER.findOne({
        where: { id },
        attributes: ["email"],
        raw: true,
      });
      return email ? email : null;
    } catch (err) {
      throw err;
    }
  },

  updateUserPassword: async (hash, id) => {
    try {
      await USER.update({ password: hash }, { where: { id } });
    } catch (err) {
      throw err;
    }
  },

  findUnexpiredTokenByEmail: async userEmail => {
    try {
      return await PWDTOKEN.findOne({
        where: { userEmail, expirationDate: { [Op.gte]: new Date() } },
      });
    } catch (err) {
      throw err;
    }
  },

  setTokenExpirationDate: async () => {
    try {
      return new Date().setMinutes(new Date().getMinutes() + 30);
    } catch (err) {
      throw err;
    }
  },

  findPWDTokenByEmail: async userEmail => {
    try {
      return await PWDTOKEN.findOne({ where: { userEmail }, raw: true });
    } catch (err) {
      throw err;
    }
  },

  createPWDToken: async (token, expirationDate, userEmail) => {
    try {
      return await PWDTOKEN.create({ token, expirationDate, userEmail });
    } catch (err) {
      throw err;
    }
  },

  updatePWDToken: async (id, token, expirationDate, userEmail) => {
    try {
      return await PWDTOKEN.update({ token, expirationDate, userEmail }, { where: { id } });
    } catch (err) {
      throw err;
    }
  },
};
