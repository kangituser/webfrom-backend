const PWDTOKEN = require('../../models/pwdToken');
const { Op } = require('sequelize');

const findPWDTokenByEmail = async email => await PWDTOKEN.findOne({ where: { userEmail: email }});

const createPWDToken = async (hash, date, email) => await PWDTOKEN.create({
  token: hash,
  expirationDate: date,
  userEmail: email,
});

const findUnexpiredTokenByEmail = async email => await PWDTOKEN.findOne({ where: { userEmail: email, expirationDate: { [Op.gt]: new Date() } }})

module.exports = { findPWDTokenByEmail, createPWDToken, findUnexpiredTokenByEmail };
