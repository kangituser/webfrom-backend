
const GetAll = async (req, res) => {
    const { responseHandler } = require('../shared/response-handler');
    const { findAllUsers } = require('../shared/user-querrys');
  try {
    const users = await findAllUsers();

    responseHandler(res, 200, { users: users });
  } catch (err) {
    responseHandler(res, 500, { message: err.message });
  }
};

module.exports = { GetAll };