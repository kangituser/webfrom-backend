const bcrypt = require('bcryptjs');

const comparePassowrds = async (inputPwd, dbPwd) => await bcrypt.compare(inputPwd, dbPwd);

const hashPassword = async password => await bcrypt.hash(password, 12);

module.exports = { comparePassowrds, hashPassword };