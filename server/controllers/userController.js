const User = require("../models/user");
import ValidationUtils from "../utils/ValidationUtils";
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
import { decodedToken } from "./authController";

const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const emailValidation = ValidationUtils.validateEmail(email);
    const nameValidation = ValidationUtils.validateNinjaName(name);
    const passwordValidation = ValidationUtils.validatePassword(password);
    const confirmPasswordValidation = ValidationUtils.validateConfirmPassword(
      password,
      confirmPassword
    );
    const emailNull = ValidationUtils.validateNull(email, "email");
    let success = true;
    const responseData = {};
    if (emailNull && !emailNull.isValid) {
      success = false;
      responseData["emailRequired"] = {
        field: "email",
        isValid: emailNull.isValid,
        error: emailNull.errorMessage,
        errorTag: "email-required",
      };
    }
    if (emailValidation && !emailValidation.isValid) {
      success = false;
      responseData["emailInvalid"] = {
        field: "email",
        isValid: emailValidation.isValid,
        error: emailValidation.errorMessage,
        errorTag: "email-invalid",
      };
    }

    if (nameValidation && !nameValidation.isValid) {
      success = false;
      responseData["nameInvalid"] = {
        field: "name",
        isValid: nameValidation.isValid,
        error: nameValidation.errorMessage,
        errorTag: "name-invalid",
      };
    }

    if (passwordValidation && !passwordValidation.isValid) {
      success = false;
      responseData["passwordInvalid"] = {
        field: "password",
        isValid: passwordValidation.isValid,
        error: passwordValidation.errorMessage,
        errorTag: "password-invalid",
      };
    }
    if (confirmPasswordValidation && !confirmPasswordValidation.isValid) {
      success = false;
      responseData["confirmPasswordInvalid"] = {
        field: "confirmPassword",
        isValid: confirmPasswordValidation.isValid,
        error: confirmPasswordValidation.errorMessage,
        errorTag: "confirmpassword-invalid",
      };
    }

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { name: name }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        success = false;
        responseData["emailExisting"] = {
          field: "email",
          isValid: false,
          error: "Email already exists",
          errorTag: "email-existing",
        };
      }

      if (existingUser.name === name) {
        success = false;
        responseData["nameExisting"] = {
          field: "name",
          isValid: false,
          error: "Ninja name already exists",
          errorTag: "name-existing",
        };
      }
    }

    if (!success) {
      return res.json({ success, ...responseData });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      active: true,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};

const getUserByName = async (req, res) => {
  try {
    const { name } = req.params;
    const user = await User.findOne({ where: { name: name } });
    if (user) {
      return res.status(200).json({
        success: true,
        message: "Usuário encontrado com sucesso",
        user: user,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro ao obter usuário",
      error: error.message,
    });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { email } = req.body;
    const userData = await User.findOne({ where: { email: email } });
    if (userData) {
      const { email, password, photo_url, where, status } = req.body;
      let numUpdated = 0;
      let updatedUser = null;

      switch (where) {
        case "status-update":
          [numUpdated, updatedUser] = await User.update(
            { status },
            { where: { id: userData.id }, returning: true }
          );
          break;

        default:
          break;
      }

      if (numUpdated === 0) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Usuário atualizado com sucesso",
        user: updatedUser[0],
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "token-invalid",
        message: "Erro ao atualizar usuário",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro ao atualizar usuário",
      error: error.message,
    });
  }
};

const deleteUserByName = async (req, res) => {
  try {
    const { name } = req.params;
    const numDeleted = await User.destroy({ where: { name: name } });
    if (numDeleted === 0) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Usuário excluído com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro ao excluir usuário",
      error: error.message,
    });
  }
};

module.exports = {
  createUser,
  getUserByName,
  updateUserById,
  deleteUserByName,
};
