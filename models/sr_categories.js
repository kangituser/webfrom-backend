const { Model, INTEGER, STRING } = require("sequelize");

class SERVICE_CATEGORIES extends Model {}
const options = require('./Utils/model-options')("mvcSR_CATEGORIES");

SERVICE_CATEGORIES.init(
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
    catName: {
      type: STRING,
      allowNull: true,
    },
  }, options);

module.exports = SERVICE_CATEGORIES;
