const { Model, INTEGER, STRING, BOOLEAN } = require("sequelize");

class USER extends Model {}
const options = require('./Utils/model-options')("mvcUSER");

USER.init({
    id: {
      type: INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: STRING,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: true,
    },
    fullName: {
      type: STRING,
      allowNull: true,
    },
    isActive: {
      type: BOOLEAN,
      allowNull: true,
    },
    role: {
      type: INTEGER,
      allowNull: true,
    },
    phoneNumber: {
      type: STRING,
      allowNull: true,
    },
  }, options);

module.exports = USER;
