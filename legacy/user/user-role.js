const { findUserRoleById } = require('../shared/user-querrys');
const { responseHandler } = require('../shared/response-handler');

const GetRole = async ({ id }, res) => responseHandler(res, 200, await findUserRoleById(id));

module.exports = { GetRole };