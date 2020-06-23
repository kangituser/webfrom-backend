const deleteASR = async (req, res) => {
  const { findUserById } = require('../../shared/user-querrys');
  const { responseHandler } = require('../../shared/response-handler')
  const { id } = req;
  const { srId } = req.body;
  const user = await findUserById(id);
  if (user.role == 1) {
    deleteASRequest(srId, res);
  } else {
    responseHandler(res, 422, { message: "unauthorized user " });

  }
};

module.exports = { deleteASR };