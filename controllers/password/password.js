const PWDTOKEN = require('../../models/pwdToken');
const { Op } = require('sequelize');

const TokenGenerator = require('uuid-token-generator');
const bcrypt = require('bcryptjs');
const mail = require('../../mail/massage-routelet');
const { findUserByEmail, findUserById, findSingleUserByEmail } = require('../../shared/query-store');

const Update = async ({ body, id, originalUrl }, res, next) => { 
  let message;
  let status;  
  try {
    const authUser = await findUserById(id);
    const hash = await bcrypt.hash(body.password, 12);
    if (authUser.role === 1) {
      const user = await findUserById(body.id); // find user to update password
      
      if (user) {
        user.password = hash;
        await user.save();
        mail.messageRoutelet({ name: user.fullName, email: user.email }, originalUrl, body.password, 'success');
        status = 201;
        message = 'password was successfully updated';
      } else {
        status = 404;
        message = 'used does not exist';
      }
    } else {
      status = 422;
      message = 'unauthorized user';
    }
    res.status(status).json({ message: message });
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
};

const Generate = async ({ body, originalUrl}, res, next) => {
  const email = body.email;  
  const newToken = tokenGenerator();
  const date = setTokenExpirationDate();
  let message;

  try {
    const user = await findUserByEmail(email);       
    const token = await PWDTOKEN.findOne({ where: { userEmail: email }});
    
    if (!token) {
      // if email does not exist
      const hash = await bcrypt.hash(newToken, 12);
      const createdToken = await PWDTOKEN.create({
        token: hash,
        expirtaionDate: date.toLocaleString('he-IL', {timezone: 'Asia/Jerusalem'}),
        userEmail: email,
      });
      message = 'token generated successfully!';
      mail.messageRoutelet({ name: user.fullName, email: user.email, token }, originalUrl, newToken);
    } else {
      token.token = newToken;
      token.expirtaionDate = date.toLocaleString('he-IL', {timezone: 'Asia/Jerusalem'});
      token.userEmail = email;
      await token.save();
      message = 'token generated successfully!';
      mail.messageRoutelet({ name: user.fullName, email: user.email, token }, originalUrl, newToken);
    }
    res.status(201).send({ message: message })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
};

const Reset = async ({ body, originalUrl }, res, next) => {
  const email = body.email;
  const pwd = body.password;
  const token = body.token;
  const route = originalUrl;
  try {
    const tokenData = await PWDTOKEN.findOne({ where: { userEmail: email, expirationDate: { [Op.gt]: new Date() } }});
    if (tokenData) {
      if (tokenData.token === token) {
        const hash = await bcrypt.hash(pwd, 12);
        const user = await findSingleUserByEmail(email);
        
        user.password = hash;
        await user.save();

        mail.messageRoutelet({ name: user.fullName, email: user.email }, route, pwd, 'success');
        res.status(201).send({ message: 'password updated' });
      } else {
        res.status(422).send({ message: 'could not update password with this token' });
      }
    } else {
      res.status(422).send({ message: 'could not update password with this token' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
};

const setTokenExpirationDate = () =>  new Date().setMinutes(new Date().getMinutes() + 30)

const tokenGenerator = () => new TokenGenerator(256, TokenGenerator.BASE62).generate();

module.exports = { Reset, Generate, Update };