const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../util/database");

class ASR extends Model {}

ASR.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    problem_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    problem_sub_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    insert_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true,
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    close_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    sr_cust_module: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    module_klh_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    impact: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    impact_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name_open: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone_open: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email_open: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id_open: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dateToIssue: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    solution: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    root_problem: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "mvcASR",
    timestamps: false,
    freezeTableName: true,
  }
);

// ASR.sync({ alter: true })


module.exports = ASR;
