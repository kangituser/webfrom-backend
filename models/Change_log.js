const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../util/database");

class CHANGE_LOG extends Model {}

CHANGE_LOG.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    srId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    old_value: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    new_value: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    edited_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date_edited: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "mvcCHANGE_LOG",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = CHANGE_LOG;
