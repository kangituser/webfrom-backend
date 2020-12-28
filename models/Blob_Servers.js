const { STRING, INTEGER, Model } = require("sequelize");

class BLOB_SERVERS extends Model {}
const options = require("./Utils/model-options")("mvcBLOB_SERVERS");

BLOB_SERVERS.init({
    id: {
      type: INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    serverName: {
      type: STRING,
      allowNull: true,
    },
    serverUrl: {
      type: STRING,
      allowNull: true,
    },
  }, options);

module.exports = BLOB_SERVERS;
