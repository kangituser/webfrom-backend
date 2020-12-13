const { DataTypes, Model } = require("sequelize");
const sequelize = require("../util/database");

class PWDTOKEN extends Model {}

PWDTOKEN.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "mvcPWD_TOKEN",
    timestamps: false,
    freezeTableName: true,
  }
);

// PWDTOKEN.sync({ force: true});

module.exports = PWDTOKEN;