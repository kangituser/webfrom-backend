const { DataTypes, Model } = require('sequelize');
const sequelize = require('../util/database');

class STATE extends Model {}

STATE.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  srId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  syncStatus: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  syncStatusName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  syncUpdated: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: true,
  }
}, { 
  sequelize,
  modelName: 'mvcSTATE',
  timestamps: false, 
  freezeTableName: true,
})

// STATE.sync({ alter: true })



module.exports = STATE;
