const { Model, INTEGER, STRING } = require("sequelize");

class CATEGORIES extends Model {}
const options = require('./Utils/model-options')("mvcCATEGORIES");

CATEGORIES.init({
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

module.exports = CATEGORIES;
