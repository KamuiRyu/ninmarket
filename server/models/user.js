const { DataTypes } = require("sequelize");
const sequelize = require("../config");
require("dotenv").config();

let dbSchema = "public";
if (process.env.DB_SCHEMA) {
  dbSchema = process.env.DB_SCHEMA;
}

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    auth_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    token_expirationTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    photo_url: {
      type: DataTypes.STRING(650),
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    schema: dbSchema,
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

module.exports = User;
