const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../util/database");

class CLOSE_STATUS extends Model {}

CLOSE_STATUS.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    statusName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "mvcCLOSE_STATUS",
    timestamps: false,
    freezeTableName: true,
  }
);

// CLOSE_STATUS.sync({ alter: true });
CLOSE_STATUS.sync();

module.exports = CLOSE_STATUS;
