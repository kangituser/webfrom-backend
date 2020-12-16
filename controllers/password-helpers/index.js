const {
  findUserRoleById,
  findUserEmailById,
  findUserById,
  updateUserPassword,
  findUnexpiredTokenByEmail,
  setTokenExpirationDate,
  findPWDTokenByEmail,
  updatePWDToken
} = require("./queries");

module.exports = {
  findUserRoleById,
  findUserEmailById,
  findUserById,
  updateUserPassword,
  findUnexpiredTokenByEmail,
  setTokenExpirationDate,
  findPWDTokenByEmail,
  updatePWDToken
};
