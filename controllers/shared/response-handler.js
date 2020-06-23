const responseHandler = (res, status, obj) => res.status(status).send(obj);

module.exports = { responseHandler };
