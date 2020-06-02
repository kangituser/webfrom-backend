const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../util/database");

class IMPACT extends Model {}

IMPACT.init(
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
    affectionName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "mvcIMPACT",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = IMPACT;
