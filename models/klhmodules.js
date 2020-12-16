const { Model, INTEGER, STRING } = require("sequelize");

class KLH_MODULES extends Model {}
const options = require('./Utils/model-options')("mvcKLH_MODULES");

KLH_MODULES.init(
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    moduleId: {
      type: INTEGER,
      allowNull: true,
    },
    moduleName: {
      type: STRING,
      allowNull: true,
    },
  }, options);

module.exports = KLH_MODULES;
