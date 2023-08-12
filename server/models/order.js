const { DataTypes } = require("sequelize");
const sequelize = require("../config");
require("dotenv").config();

let dbSchema = "public";
if (process.env.DB_SCHEMA) {
  dbSchema = process.env.DB_SCHEMA;
}

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    visible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    active:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  },
  {
    tableName: "orders",
    schema: dbSchema,
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

const User = require("./user");
const Item = require("./item");

Order.belongsTo(User, { foreignKey: "user_id" });
Order.belongsTo(Item, { foreignKey: "item_id" });

module.exports = Order;