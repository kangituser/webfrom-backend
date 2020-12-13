const { DataTypes, Model } = require("sequelize");
const sequelize = require("../util/database");

class SERVICE_CATEGORIES extends Model {}

SERVICE_CATEGORIES.init(
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
    modelName: "mvcSR_CATEGORIES",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = SERVICE_CATEGORIES;
