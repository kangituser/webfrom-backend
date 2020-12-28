const {
  signToken,
  passwordsAreEqual,
  hashPassword,
  generateToken,
  expirationDate,
  cerateToken
} = require("./authentication");

const {
  findTokenByUserEmail,
  findUserByEmail,
  findAllAdmins,
  createUser
} = require("./queries");

module.exports = {
  passwordsAreEqual,
  signToken,
  hashPassword,
  generateToken,
  expirationDate,
  cerateToken,
  findUserByEmail,
  findTokenByUserEmail,
  findAllAdmins,
  createUser
};
