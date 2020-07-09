const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../util/database");
const BLOB = require('./Blob');
 
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
      references: {
        model: BLOB,
        key: 'srId'
      }
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

CHANGE_LOG.belongsTo(BLOB, { targetKey: 'srId', foreignKey: 'srId'})

CHANGE_LOG.sync({ alter: false })

module.exports = CHANGE_LOG;
