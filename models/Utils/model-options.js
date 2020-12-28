const sequelize = require('./database');

module.exports = name => {
  return {
    sequelize,
    modelName: name,
    timestamps: false,
    freezeTableName: true,
  }
}