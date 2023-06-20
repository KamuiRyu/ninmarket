const User = require("../models/user");
import ValidationUtils from "../../shared/utils/ValidationUtils";
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const emailValidation = ValidationUtils.validateEmail(email);
        const nameValidation = ValidationUtils.validateNinjaName(name);
        const passwordValidation = ValidationUtils.validatePassword(password);
        let responseData = {};

        if (!emailValidation.isValid) {
            responseData["emailInvalid"] = {
                success: false,
                field: "email",
                isValid: emailValidation.isValid,
                error: emailValidation.errorMessage,
                errorTag: "email-invalid",
            };
        }

        if (!nameValidation.isValid) {
            responseData["nameInvalid"] = {
                success: false,
                field: "name",
                isValid: nameValidation.isValid,
                error: nameValidation.errorMessage,
                errorTag: "name-invalid",
            };
        }

        if (!passwordValidation.isValid) {
            responseData["passwordInvalid"] = {
                success: false,
                field: "password",
                isValid: passwordValidation.isValid,
                error: passwordValidation.errorMessage,
                errorTag: "password-invalid",
            };
        }

        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ email }, { ninja_name: name }],
            },
        });

        if (existingUser) {
            if (existingUser.email === email) {
                responseData["emailExisting"] = {
                    success: false,
                    field: "email",
                    isValid: false,
                    error: "Email already exists",
                    errorTag: "email-existing",
                };
            }

            if (existingUser.ninja_name === name) {
                responseData["nameExisting"] = {
                    success: false,
                    field: "name",
                    isValid: false,
                    error: "Ninja name already exists",
                    errorTag: "name-existing",
                };
            }
        }

        if (Object.keys(responseData).length > 0) {
            return res.status(400).json(responseData);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            ninja_name: name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                id: newUser.id,
                name: newUser.ninja_name,
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
        const user = await User.findOne({ where: { ninja_name: name } });
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

const updateUserByName = async (req, res) => {
    try {
        const { name } = req.params;
        const { email, password } = req.body;
        const [numUpdated, updatedUser] = await User.update(
            { email, password },
            { where: { ninja_name: name }, returning: true }
        );
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
        const numDeleted = await User.destroy({ where: { ninja_name: name } });
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
    updateUserByName,
    deleteUserByName,
};
