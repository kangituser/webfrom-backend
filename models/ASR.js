const { Model, INTEGER, STRING, NOW, TEXT, DATE } = require("sequelize");
const BLOB = require("./Blob");
const CHANGE_LOG = require("./Change_log");
const CLOSE_STATUS = require("./close-status");

class ASR extends Model {}
const options = require('./Utils/model-options')("mvcASR")

ASR.init({
    id: {
      type: INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    problem_type: {
      type: STRING,
      allowNull: true,
    },
    problem_sub_type: {
      type: STRING,
      allowNull: true,
    },
    title: {
      type: STRING,
      allowNull: true,
    },
    description: {
      type: TEXT,
      allowNull: true,
    },
    status: {
      type: INTEGER,
      allowNull: true,
    },
    status_name: {
      type: STRING,
      allowNull: true,
    },
    insert_time: {
      type: DATE,
      defaultValue: NOW,
      allowNull: true,
    },
    update_time: {
      type: DATE,
      allowNull: true,
    },
    close_time: {
      type: DATE,
      allowNull: true,
    },
    sr_cust_module: {
      type: INTEGER,
      allowNull: true,
    },
    module_klh_name: {
      type: STRING,
      allowNull: true,
    },
    impact: {
      type: INTEGER,
      allowNull: true,
    },
    impact_name: {
      type: STRING,
      allowNull: true,
    },
    name_open: {
      type: STRING,
      allowNull: true,
    },
    phone_open: {
      type: STRING,
      allowNull: true,
    },
    email_open: {
      type: STRING,
      allowNull: true,
    },
    id_open: {
      type: INTEGER,
      allowNull: true,
    },
    dateToIssue: {
      type: DATE,
      allowNull: true,
    },
    solution: {
      type: TEXT,
      allowNull: true,
    },
    root_problem: {
      type: STRING,
      allowNull: true,
    },
    closeStatusId: {
      type: INTEGER,
      allowNull: true,
    },
    closeStatusName: {
      type: STRING,
      allowNull: true,
    },
  }, options);

  ASR.hasOne(BLOB, { sourceKey: "id", foreignKey: "srId", onDelete: "CASCADE", onUpdate: "CASCADE" });
  ASR.hasOne(CLOSE_STATUS, { sourceKey: "closeStatusId", foreignKey: "statusId", constraints: false });
  ASR.hasMany(CHANGE_LOG, { sourceKey: "id", foreignKey: "srId", constraints: false });

// ASR.sync({ alter: true });

module.exports = ASR;
