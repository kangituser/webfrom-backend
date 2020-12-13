const _auth = require("./auth-helpers");

module.exports = {
  Login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      // find user
      let user = await _auth.findUserByEmail(email);

      // handle user not found
      if (!user) {
        return res.status(404).send({ message: "user not found" });
      }

      // handle inactive user
      if (!user.isActive) {
        return res.status(422).send({ message: "user is not active." });
      }

      // prep token & password validations
      let { expirationDate } = await _auth.findTokenByUserEmail(user.email);
      const passwordsAreEqual = await _auth.passwordsAreEqual(
        password,
        user.password
      );
      const token = _auth.signToken(user.id);

      if (passwordsAreEqual) {
        return res
          .status(200)
          .send({ auth: true, token, expirationDate, role: user.role });
      } else {
        return status(401).send({ message: "password is incorrect." });
      }
    } catch (err) {
      next(err);
    }
  },

  Register: async (req, res, next) => {
    try {
      const { originalUrl } = req;
      const { email, password } = req.body;
      const user = await _auth.findUserByEmail(email);
      
      if (!user) {
        const expirationDate = _auth.expirationDate()
        const hash = await _auth.hashPassword(password);
        const token = await _auth.generateToken();
        const createdUser = _auth.createUser(hash, user)
        const adminEmails = await _auth.findAllAdminEmails();
        // TODO: send email ({ name: fullName, email: adminEmails }, originalUrl, null, 'waiting')
        const creteToken = await _auth.cerateToken(token, expirationDate, createdUser.email);
        return res.status(201).send({ message: 'user created successfuly' })
      } else {
        return res.status(401).send({ message: 'user already exists.' });
      }
    } catch (err) {
      next(err);
    }
  },
};
