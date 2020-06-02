const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../util/database");

class STATUS extends Model {}

STATUS.init({
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
  }
}, { sequelize,
  modelName: "mvcSTATUS",
  timestamps: false,
  freezeTableName: true, })

module.exports = STATUS;
