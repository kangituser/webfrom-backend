
const createUser = async (hash, user) => {
  const USER = require('../../models/user');
    
    const { cellHandler } = require('./user-cell-handler');  
    const { email, fullName, phoneNumber } = user;

    return await USER.create({
      email: email,
      password: hash,
      fullName: fullName,
      isActive: 0, 
      role: 3,
      phoneNumber: cellHandler(phoneNumber),
    });
  };

module.exports = { createUser };