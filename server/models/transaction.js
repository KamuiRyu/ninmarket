const { DataTypes } = require("sequelize");
const sequelize = require("../config");
require("dotenv").config();

let dbSchema = "public";
if (process.env.DB_SCHEMA) {
  dbSchema = process.env.DB_SCHEMA;
}

const Transaction = sequelize.define(
  "Transaction",
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
    priceUnit: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "transactions",
    schema: dbSchema,
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

const Order = require("./order");
Transaction.belongsTo(Order, { foreignKey: "order_id" });

module.exports = Transaction;