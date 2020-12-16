const { Model, INTEGER, STRING, DATE } = require("sequelize");

class PWDTOKEN extends Model {}
const options = require('./Utils/model-options')("mvcPWD_TOKEN");

PWDTOKEN.init({
    id: {
      type: INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    token: {
      type: STRING,
      allowNull: true,
    },
    expirationDate: {
      type: DATE,
      allowNull: true,
    },
    userEmail: {
      type: STRING,
      allowNull: true,
    },
  }, options);

// PWDTOKEN.sync({ force: true});

module.exports = PWDTOKEN;