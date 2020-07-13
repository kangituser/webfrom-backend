const USER = require('../../models/user');

const findUserByEmail = async email => await USER.findOne({ where: { email: email }, raw: true });

const findSingleUserByEmail = async email => await USER.findOne({ where: { email: email }});

const findUserById = async id => await USER.findOne({ where: { id: id }});

const findUserRoleById = async id => await USER.findOne({ where: { id: id }, attributes: ['role']});

const findAllAdmins = async () => await USER.findAll({ where: { role: 1 }, attributes: ["email"], raw: true });

const findAllUsers = async () => await USER.findAll({ order: [["id", "DESC"]]});

const findKLHUsers = async () => await USER.findAll({ where: { role: 2 }, raw: true});

module.exports = { 
    findSingleUserByEmail, 
    findUserRoleById, 
    findUserByEmail, 
    findAllAdmins, 
    findUserById, 
    findKLHUsers,
    findAllUsers
};