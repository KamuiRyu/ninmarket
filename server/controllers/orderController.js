const { Op, literal } = require("sequelize");
const Order = require("../models/order");
const User = require("../models/user");
import ValidationUtils from "../utils/ValidationUtils";

const getItemBySlug = async (req, res) => {
  const { type, itemId, status } = req.query;
  try {
    const orders = await Order.findAll({
      where: {
        item_id: itemId,
        status: 0,
        visible: true,
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
    const itemIdValidation = ValidationUtils.validateNull(
      itemId,
      "Item name"
    );
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

    const existingUser = await User.findOne({
      where: {
        id: req.user.id,
      },
    });

    if(!existingUser){
      success = false;
      responseData["userNotFound"] = {
        field: "user not fount",
        isValid: false,
        error: "User not found",
        errorTag: "user-notfound",
      };
    }

    if (!success) {
      return res.json({ success, ...responseData });
    }

    const existingOrder = await Order.findOne({
      where: {
        user_id: req.user.id,
        item_id: itemId,
        type: orderType,
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
      status: 0,
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

module.exports = {
  getItemBySlug,
  createPost
};
