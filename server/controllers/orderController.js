const { Op, literal } = require("sequelize");
const Order = require("../models/order");
const User = require("../models/user");
const Item = require("../models/item");
const Transaction = require("../models/transaction");
import ValidationUtils from "../utils/ValidationUtils";
import { decryptID, encryptID } from "./authController";

const getItemBySlug = async (req, res) => {
  const { type, itemId } = req.query;
  try {
    const orders = await Order.findAll({
      where: {
        item_id: itemId,
        visible: true,
        active: true,
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: User,
          attributes: {
            exclude: [
              "password",
              "auth_token",
              "token_expirationTime",
              "role_id",
              "createdAt",
              "updatedAt",
              "active",
            ],
          },
          where: {
            active: true,
          },
          required: true,
        },
      ],
    });

    if (orders && orders.length > 0) {
      const ordersByType = orders.reduce((acc, order) => {
        const type = order.type;
        const typeName = type === 1 ? "wtb" : "wts";

        if (!acc[typeName]) {
          acc[typeName] = [];
        }
        acc[typeName].push(order);
        return acc;
      }, {});

      return res.status(200).json(ordersByType);
    } else {
      return res.status(200).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error("Order search error:", error);
    return res.status(500).json({ message: "Order search error" });
  }
};
const getItemByUsername = async (req, res) => {
  const { name } = req.query;
  try {
    const user = await User.findOne({
      where: {
        name: name,
        active: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const orders = await Order.findAll({
      where: {
        user_id: user.id,
        active: true,
      },
      include: [
        {
          model: Item,
          attributes: ["name", "id", "image_url", "slug", "type"],
        },
      ],
      attributes: {
        exclude: ["item_id"],
      },
    });

    if (orders && orders.length > 0) {
      const ordersWithEncryptedIDs = orders.map((order) => {
        const encryptedOrder = { ...order.toJSON() };
        encryptedOrder.id = encryptID(order.id);
        encryptedOrder.user_id = encryptID(order.user_id);
        encryptedOrder.Item.id = encryptID(order.Item.id);
        return encryptedOrder;
      });

      const ordersByType = ordersWithEncryptedIDs.reduce((acc, order) => {
        const type = order.type;
        const typeName = type === 1 ? "wtb" : "wts";

        if (!acc[typeName]) {
          acc[typeName] = [];
        }
        acc[typeName].push(order);
        return acc;
      }, {});
      return res.status(200).json(ordersByType);
    } else {
      return res.status(200).json({ message: "No orders found for this user" });
    }
  } catch (error) {
    console.error("Order search error:", error);
    return res.status(500).json({ message: "Order search error" });
  }
};

const createPost = async (req, res) => {
  try {
    const { orderType, visibility, itemId, price, quantity } = req.body;
    const orderTypeValidation = ValidationUtils.validateNull(
      orderType,
      "Order type"
    );
    const visibilityValidation = ValidationUtils.validateNull(
      visibility,
      "Initial visibility"
    );
    const itemIdValidation = ValidationUtils.validateNull(itemId, "Item name");
    const priceValidation = ValidationUtils.validateNull(
      price,
      "Price per unit"
    );
    const quantityValidation = ValidationUtils.validateNull(
      quantity,
      "Quantity"
    );
    let success = true;
    const responseData = {};
    if (orderTypeValidation && !orderTypeValidation.isValid) {
      success = false;
      responseData["orderTypeRequired"] = {
        field: "Order type",
        isValid: orderTypeValidation.isValid,
        error: orderTypeValidation.errorMessage,
        errorTag: "ordertype-required",
      };
    }
    if (visibilityValidation && !visibilityValidation.isValid) {
      success = false;
      responseData["visibilityRequired"] = {
        field: "Initial visibility",
        isValid: visibilityValidation.isValid,
        error: visibilityValidation.errorMessage,
        errorTag: "visibility-required",
      };
    }

    if (itemIdValidation && !itemIdValidation.isValid) {
      success = false;
      responseData["itemIdRequired"] = {
        field: "Item name",
        isValid: itemIdValidation.isValid,
        error: itemIdValidation.errorMessage,
        errorTag: "itemId-required",
      };
    }

    if (priceValidation && !priceValidation.isValid) {
      success = false;
      responseData["priceRequired"] = {
        field: "Price per unit",
        isValid: priceValidation.isValid,
        error: priceValidation.errorMessage,
        errorTag: "price-required",
      };
    }
    if (quantityValidation && !quantityValidation.isValid) {
      success = false;
      responseData["quantityRequired"] = {
        field: "Quantity",
        isValid: quantityValidation.isValid,
        error: quantityValidation.errorMessage,
        errorTag: "quantity-required",
      };
    }

    if (!success) {
      return res.json({ success, ...responseData });
    }
    let userId = req.user.id;
    userId = decryptID(userId);
    if (userId) {
      const existingUser = await User.findOne({
        where: {
          id: userId,
        },
      });
      if (!existingUser) {
        success = false;
        responseData["userNotFound"] = {
          field: "user not fount",
          isValid: false,
          error: "User not found",
          errorTag: "user-notfound",
        };
      } else {
        success = false;
        responseData["userNotFound"] = {
          field: "user not fount",
          isValid: false,
          error: "User not found",
          errorTag: "user-notfound",
        };
      }
    }

    if (!success) {
      return res.json({ success, ...responseData });
    }

    const existingOrder = await Order.findOne({
      where: {
        user_id: req.user.id,
        item_id: itemId,
        type: orderType,
        active: true,
      },
    });

    if (existingOrder) {
      success = false;
      responseData["orderExisting"] = {
        field: "order existing",
        isValid: false,
        error: "Order existing",
        errorTag: "order-existing",
      };
    }

    if (!success) {
      return res.json({ success, ...responseData });
    }

    const newOrder = await Order.create({
      user_id: req.user.id,
      item_id: itemId,
      type: orderType,
      price: price,
      quantity: quantity,
      visible: visibility,
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error.message,
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { user_id, order_id, where } = req.body;
    if (!user_id || !order_id) {
      return res.status(400).json({
        success: false,
        message: "Missing user ID or order ID",
      });
    }

    const userId = decryptID(user_id);
    const orderId = decryptID(order_id);

    if (userId === false || orderId === false) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID or user ID",
      });
    }

    const userData = await User.findOne({ where: { id: userId } });
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const orderData = await Order.findOne({
      where: { user_id: userId, id: orderId },
    });

    if (!orderData) {
      return res.status(404).json({
        success: false,
        message: "Order was not found or does not belong to this user",
      });
    }

    switch (where) {
      case "order-done":
        const { quantity } = req.body.order;

        if (quantity <= 0) {
          return res.status(400).json({
            success: false,
            message: "Invalid quantity value",
          });
        }

        if (quantity > orderData.quantity) {
          return res.status(400).json({
            success: false,
            message: "Requested quantity exceeds available quantity",
          });
        }

        const price = parseFloat(orderData.price);
        if (isNaN(price)) {
          return res.status(400).json({
            success: false,
            message: "Invalid price value",
          });
        }

        await Transaction.create({
          order_id: orderData.id,
          quantity: quantity,
          priceUnit: price,
          type: orderData.type,
        });

        orderData.quantity -= quantity;

        if (orderData.quantity === 0) {
          orderData.active = false;
        }
        await orderData.save();

        const updatedOrderData = {
          id: order_id,
          quantity: orderData.quantity,
          active: orderData.active,
        };

        return res.status(200).json({
          success: true,
          message: "Order updated successfully",
          data: updatedOrderData,
        });
      case "order-edit":
        let {
          visible,
          price: newPrice,
          quantity: newQuantity,
        } = req.body.order;
        visible = visible === true ? true : false;
        if (newQuantity <= 0) {
          return res.status(200).json({
            success: false,
            message: "Invalid quantity value",
          });
        }
        if (typeof visible !== "boolean") {
          return res.status(200).json({
            success: false,
            message: "Invalid 'visible' value",
          });
        }

        if (newPrice <= 0) {
          return res.status(200).json({
            success: false,
            message: "Invalid price value",
          });
        }


        const parsedPrice = parseFloat(newPrice);
        if (isNaN(parsedPrice)) {
          return res.status(200).json({
            success: false,
            message: "Invalid 'price' value",
          });
        }
        

        orderData.visible = visible;
        orderData.price = parsedPrice;
        orderData.quantity = newQuantity;
        await orderData.save();
        const updatedOrder = {
          id: order_id,
          visible: visible,
          price: parsedPrice.toFixed(2),
          quantity: newQuantity,
        };

        return res.status(200).json({
          success: true,
          message: "Order updated successfully",
          data: updatedOrder,
        });
      case "order-quantity":
        const nQuantity = req.body.order.quantity;

        if (newQuantity <= 0) {
          return res.status(400).json({
            success: false,
            message: "Invalid quantity value",
          });
        }

        orderData.quantity = nQuantity;
        await orderData.save();

        const updatedOrderData2 = {
          id: order_id,
          quantity: orderData.quantity,
        };

        return res.status(200).json({
          success: true,
          message: "Order quantity updated successfully",
          data: updatedOrderData2,
        });
      case "order-visible":
        const newVisible = req.body.order.visible;
        if (typeof newVisible !== "boolean") {
          return res.status(400).json({
            success: false,
            message: "Invalid 'visible' value",
          });
        }
        orderData.visible = newVisible;
        await orderData.save();

        const updatedOrderData3 = {
          id: order_id,
          visible: orderData.visible,
        };

        return res.status(200).json({
          success: true,
          message: "Order visibility updated successfully",
          data: updatedOrderData3,
        });
      case "order-active":
        orderData.active = false;
        await orderData.save();

        const updatedOrderData4 = {
          id: order_id,
          active: orderData.active,
        };

        return res.status(200).json({
          success: true,
          message: "Order deactivated successfully",
          data: updatedOrderData4,
        });
      default:
        return res.status(400).json({
          success: false,
          message: "Invalid 'where' parameter",
        });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  getItemBySlug,
  createPost,
  getItemByUsername,
  updateOrder,
};
