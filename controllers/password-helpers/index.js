const {
  findUserById,
  updateUserPassword,
  findUnexpiredTokenByEmail,
  setTokenExpirationDate,
  findPWDTokenByEmail,
  updatePWDToken
} = require("./queries");

module.exports = {
  findUserById,
  updateUserPassword,
  findUnexpiredTokenByEmail,
  setTokenExpirationDate,
  findPWDTokenByEmail,
  updatePWDToken
};
