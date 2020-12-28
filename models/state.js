const { Model, NOW, INTEGER, STRING, DATE } = require('sequelize');

class STATE extends Model {}
const options = require('./Utils/model-options')("mvcSTATE");

STATE.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  srId: {
    type: INTEGER,
    allowNull: true,
  },
  syncStatus: {
    type: INTEGER,
    allowNull: true,
  },
  syncStatusName: {
    type: STRING,
    allowNull: true,
  },
  syncUpdated: {
    type: DATE,
    defaultValue: NOW,
    allowNull: true,
  }
}, options);

// STATE.sync({ alter: true })



module.exports = STATE;
