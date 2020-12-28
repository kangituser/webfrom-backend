const { Model, INTEGER, STRING, DATE } = require("sequelize");

class TOKEN extends Model {}
const options = require('./Utils/model-options')("mvcTOKEN");

TOKEN.init({
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

  // TOKEN.sync();

module.exports = TOKEN;
