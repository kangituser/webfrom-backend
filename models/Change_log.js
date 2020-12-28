const { Model, INTEGER, STRING, DATE, NOW } = require("sequelize");
 
class CHANGE_LOG extends Model {}
const options = require('./Utils/model-options')("mvcCHANGE_LOG");

CHANGE_LOG.init({
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
      //   key: 'id'
      // }
    },
    old_value: {
      type: STRING,
      allowNull: true,
    },
    new_value: {
      type: STRING,
      allowNull: true,
    },
    edited_by: {
      type: STRING,
      allowNull: true,
    },
    date_edited: {
      type: DATE,
      defaultValue: NOW,
      allowNull: true,
    },
  }, options);

// CHANGE_LOG.belongsTo(ASR, { targetKey: 'id', foreignKey: 'srId'})

// CHANGE_LOG.sync({ alter: false })

module.exports = CHANGE_LOG;
