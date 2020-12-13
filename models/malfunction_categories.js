const { DataTypes, Model } = require("sequelize");
const sequelize = require("../util/database");

class MALFUNCTION_CATEGORIES extends Model {}

MALFUNCTION_CATEGORIES.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    catId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    catName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "mvcMALFUNCTION_CATEGORIES",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = MALFUNCTION_CATEGORIES;
