const { INTEGER, STRING, Model } = require("sequelize");
// const ASR = require('./ASR');

class BLOB extends Model {}
const options = require('./Utils/model-options')("mvcBLOB");

BLOB.init({
    id: {
      type: INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    srId: {
      type: INTEGER,
      allowNull: true,
      // references: {
      //   model: ASR,
      //   referenceKey: 'id'
      // }
    },
    blobName: {
      type: STRING,
      allowNull: true,
    },
    containerName: {
      type: STRING,
      allowNull: true,
    },
    blobServer: {
      type: INTEGER,
      allowNull: true,
    },
  }, options);

  // BLOB.belongsTo(models.ASR, { targetKey: 'id', foreignKey: 'srId'})

// BLOB.sync({ alter: false })

module.exports = BLOB;
