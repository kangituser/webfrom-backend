const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../util/database");
const ASR = require('./ASR');

class BLOB extends Model {}

BLOB.init(
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
        model: ASR,
        key: 'id'
      }
    },
    blobName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    containerName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    blobServer: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "mvcBLOB",
    timestamps: false,
    freezeTableName: true,
  }
);

// BLOB.belongsTo(ASR, { targetKey: 'id', foreignKey: 'srId'})

BLOB.sync({ alter: false })

module.exports = BLOB;
