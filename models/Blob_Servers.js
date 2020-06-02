const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../util/database");

class BLOB_SERVERS extends Model {}

BLOB_SERVERS.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    serverName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    serverUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "mvcBLOB_SERVERS",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = BLOB_SERVERS;
