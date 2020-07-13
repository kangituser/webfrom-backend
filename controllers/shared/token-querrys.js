const TOKEN = require('../../models/token');

const findTokenByEmail = async email => await TOKEN.findOne({ where: { userEmail: email }, attributes: ['expirationDate'], raw: true });

const cerateToken = async (token, expirationDate, email) => await TOKEN.create({ token: token, expirationDate: expirationDate, userEmail: email });

const setTokenExpirationDate = async () =>  new Date().setMinutes(new Date().getMinutes() + 30)

module.exports = { findTokenByEmail, cerateToken, setTokenExpirationDate };