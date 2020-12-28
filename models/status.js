const { Model, INTEGER, STRING } = require("sequelize");

class STATUS extends Model {}
const options = require('./Utils/model-options')("mvcSTATUS");

STATUS.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  statusId: {
    type: INTEGER,
    allowNull: true,
  },
  statusName: {
    type: STRING,
    allowNull: true,
  }
}, options)

module.exports = STATUS;
