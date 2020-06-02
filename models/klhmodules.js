const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../util/database");

class KLHMODULES extends Model {}

KLHMODULES.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    moduleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    moduleName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "mvcKLH_MODULES",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = KLHMODULES;
