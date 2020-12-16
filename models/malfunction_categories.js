const { Model, INTEGER, STRING } = require("sequelize");

class MALFUNCTION_CATEGORIES extends Model {}
const options = require('./Utils/model-options')("mvcMALFUNCTION_CATEGORIES");

MALFUNCTION_CATEGORIES.init({
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
    catName: {
      type: STRING,
      allowNull: true,
    },
  }, options);

module.exports = MALFUNCTION_CATEGORIES;
