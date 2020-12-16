const Sequelize = require('sequelize/index').Sequelize;

const { DATABASE, DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST } = process.env;

const sequelize = new Sequelize(DATABASE, DATABASE_USER, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: true,
        useUTC: false,
        dateFirst: 1,
        trustServerCertificate: true,
        enableArithAbort: true,
      },
    },
    logging: false,
    timezone: '+03:00'
  });

module.exports = sequelize;