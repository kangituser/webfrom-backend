const { Model, INTEGER, STRING } = require("sequelize");

class CLOSE_STATUS extends Model {}
const options = require('./Utils/model-options')("mvcCLOSE_STATUS");

CLOSE_STATUS.init({
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
    },
  }, options);

// CLOSE_STATUS.sync({ alter: true });
// CLOSE_STATUS.sync();

module.exports = CLOSE_STATUS;
