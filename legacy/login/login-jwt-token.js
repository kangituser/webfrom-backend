const jwt = require('jsonwebtoken');

const loginJWTToken = userId => jwt.sign({ id: userId }, process.env.SECRET, { expiresIn: '168h' });  

module.exports = { loginJWTToken };