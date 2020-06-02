const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../util/database");

class TOKEN extends Model {}

TOKEN.init(
  {
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
    modelName: "mvcTOKEN",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = TOKEN;
