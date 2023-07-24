const { DataTypes } = require("sequelize");
const sequelize = require("../config");
require("dotenv").config();

let dbSchema = "public";
if (process.env.DB_SCHEMA) {
  dbSchema = process.env.DB_SCHEMA;
}

const Item = sequelize.define(
  "Item",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    slug: {
      type: DataTypes.STRING(650),
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    description: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    type: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING(650),
      allowNull: true,
    },
  },
  {
    tableName: "items",
    schema: dbSchema,
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

module.exports = Item;
