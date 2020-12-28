const TOKEN = require("../../models/token");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const TokenGenerator = require("uuid-token-generator");

const { SECRET } = process.env;

module.exports = {
  passwordsAreEqual: async (inputPwd, storedPwd) => {
    try {
      return await bcrypt.compare(inputPwd, storedPwd);
    } catch (err) {
      throw err;
    }
  },

  signToken: userId => jwt.sign({ userId }, SECRET, { expiresIn: "168h" }),

  hashPassword: async password => {
    try {
      return await bcrypt.hash(password, 12);
    } catch (err) {
      throw err;
    }
  },

  generateToken: async () => {
    try {
      return await new TokenGenerator(256, TokenGenerator.BASE62).generate();
    } catch (err) {
      throw err;
    }
  },

  expirationDate: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),

  cerateToken: async (token, expirationDate, userEmail) => {
    try {
      return await TOKEN.create({ token, expirationDate, userEmail });
    } catch (err) {
      throw err;
    }
  },
};
