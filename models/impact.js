const { Model, INTEGER, STRING } = require("sequelize");

class IMPACT extends Model {}
const options = require('./Utils/model-options')("mvcIMPACT");

IMPACT.init(
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    catId: {
      type: INTEGER,
      allowNull: true,
    },
    affectionName: {
      type: STRING,
      allowNull: true,
    },
  }, options);

module.exports = IMPACT;
