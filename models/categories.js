const { DataTypes, Model } = require("sequelize");
const sequelize = require("../util/database");

class CATEGORIES extends Model {}

CATEGORIES.init(
  {
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
    modelName: "mvcCATEGORIES",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = CATEGORIES;
