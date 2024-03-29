const _pwd = require("./password-helpers/index");
const _auth = require("./auth-helpers/index");
const sendEmail = require('./massage-routelet');
const enums = require('./mail/states');
const queries = require('./password-helpers/queries');

module.exports = {
  update: async (req, res, next) => {
    try {
      const roles = [1, -1];
      const { password, id: userId } = req.body;
      const { id, originalUrl } = req;
      const user = await _pwd.findUserById(id);
      const updatedUser = await _pwd.findUserById(userId);

      if (!user) {
        return res.status(404).send({ message: "used does not exist" });
      }

      if (!roles.includes(user.role)) {
        return res.status(422).send({ message: "unauthorized user." });
      }

      // update the user
      const hash = await _auth.hashPassword(password);
      await _pwd.updateUserPassword(hash, userId);

      // send email for updating user
      sendEmail({ name: updatedUser.fullName, email: [updatedUser.email] }, enums.PASSWORD, enums.passwordUpdate);
      return res.status(201).send({ message: "password was successfully updated" });
    } catch (err) {
      next(err);
    }
  },

  reset: async (req, res, next) => {
    try {
      const { email, password, token } = req.body;
      const { originalUrl } = req;

      const tokenData = await _pwd.findUnexpiredTokenByEmail(email);

      if (!tokenData) {
        return res.status(422).send({ message: 'Incorrect token was provided.' });
      }
      
      if (tokenData.token != token) {
        return res.status(422).send({ message: 'could not update password with this token' });
      }

        // update user password
        const hash = await _auth.hashPassword(password);
        const user = await _auth.findUserByEmail(email);
        await _pwd.updateUserPassword(hash, user.id);

        sendEmail({ name: user.fullName, email: [user.email] }, enums.PASSWORD, enums.passwordReset);

        return res.status(201).send({ message: 'password updated' });
    } catch (err) {
      next(err);
    }
  },

  key: async (req, res, next) => {
    try {
      const { email } = req.body;
      const { originalUrl } = req;

      const expirationDate = await _pwd.setTokenExpirationDate();
      const user = await _auth.findUserByEmail(email);
      const token = await _pwd.findPWDTokenByEmail(email);
      const newToken = await _auth.generateToken();

      if (!token) {
        const hash = await _auth.hashPassword(newToken);
        const createdToken = await queries.createPWDToken(hash, expirationDate, email);
        sendEmail({ name: user.fullName, email: [user.email], newToken }, enums.PASSWORD, enums.generatekey);
        return res.status(201).send({ message: 'token generated successfully!' });
      }

      await _pwd.updatePWDToken(token.id, newToken, expirationDate, email);
      sendEmail({ name: user.fullName, email: [user.email], newToken }, enums.PASSWORD, enums.generatekey);
      return res.status(201).send({ message: 'token generated successfully!' });
    } catch (err) {
      next(err);
    }
  },
};
