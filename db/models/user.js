'use strict';
const bcrypt = require('bcrypt');
const {Model, Sequelize, DataTypes} = require('sequelize');

const sequelize = require('../../config/database');
const AppError = require('../../utils/appError');

module.exports = sequelize.define(
  'users',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userType: {
      type: DataTypes.ENUM('0', '1', '2'),
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    confirmPassword: {
      type: DataTypes.VIRTUAL,
      set(value) {
        if (value == this.password) {
          const hasPassword = bcrypt.hashSync(value, 10);
          this.setDataValue('password', hasPassword);
        } else {
          throw new AppError('Password and ConfirmPassword must be same.', 400);
        }
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: 'users',
  }
);
