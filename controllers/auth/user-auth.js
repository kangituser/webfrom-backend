const TOKEN = require('../../models/token');
const USER = require('../../models/user');

const TokenGenerator = require('uuid-token-generator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mail = require('../../mail/massage-routelet');

const { findUserByEmail } = require('../../shared/query-store');

const Login = async ({ body: { email, password }}, res, next) => {
  let status;
  let obj;
  try {
    const user = await findUserByEmail(email);
    const [tokenData] = await TOKEN.findAll({ where: { userEmail: email }, raw: true });
    
    if (user && user.isActive === true) {
      // check if user exists and is active
      if (await bcrypt.compare(password, user.password)) {
        status = 201;
        obj = { auth: true, token: loginJWTToken(user.id), expirationDate: tokenData.expirationDate , role: user.role };
         res.status(201).send({ auth: true, token: loginJWTToken(user.id), expirationDate: tokenData.expirationDate , role: user.role }); // send token to front
      } else {
        status = 401;
        obj = { auth: false, token: null, message: 'incorrect password'};
        res.status(401).send({ auth: false, token: null, message: 'incorrect password'});
      }
    } else {
      // what to do if user does not exist or not active
      status = 404;
      obj = { message: 'user not active or does not exist' };
      res.status(404).send({ message: 'user not active or does not exist' });
    }
    
    // res.status(status).json(obj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const Register = async ({ originalUrl, body }, res, next) => {  

  try {
    const hash = await bcrypt.hash(body.password, 12);
    const user = await findUserByEmail(body.email);
    const token = await tokenGenerator();
    const expDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    if (!user) {
      const createdUser = await createUser(hash, body);
      
      const admins = await USER.findAll({ where: { role: 1 }, raw: true })
      let adminEmails = admins.map((admins) => {
        return admins.email;
      });
      mail.messageRoutelet({ name: createdUser.fullName, email: adminEmails }, originalUrl, null, 'waiting');
      await TOKEN.create({ token: token, expirationDate: expDate, userEmail: createdUser.email });
      return res.status(201).send({ message: 'user created successfuly' });
    } else {
      return res.status(401).send({ message: 'user already exists' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginJWTToken = userId => jwt.sign({ id: userId }, process.env.SECRET, { expiresIn: '168h' });  

const tokenGenerator = async () => await new TokenGenerator(256, TokenGenerator.BASE62).generate(); 

const createUser = async (hash, user) => {  
  return await USER.create({
    email: user.email,
    password: hash,
    fullName: user.fullName,
    isActive: 0, 
    role: 3,
    phoneNumber: cellHandler(user.phoneNumber),
  });
};

const cellHandler = cell => {
  if (cell.trim() != '' || cell != 'undefined' || cell != null) {

    if (cell.includes('+')) {
      cell = cell.replace('+', '');
    }
    if (cell.includes('-')) {
      cell = cell.replace('-', '');
    }
    if (cell.includes('!')) {
      cell = cell.replace('!', '');
    }
    if (cell.includes('972')) {
      cell = cell.replace('972', '0');
    }
  }    
  return cell;
};

module.exports = { Login, Register };