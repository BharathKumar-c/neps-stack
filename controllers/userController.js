const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const user = require('../db/models/user');
const {Sequelize} = require('sequelize');

const getAllUser = catchAsync(async (req, res, next) => {
  const allUsers = await user.findAndCountAll({
    where: {
      userType: {
        [Sequelize.Op.ne]: '0',
      },
    },
    attributes: {
      exclude: ['password'],
    },
  });

  if (!allUsers) {
    return next(new AppError('No users found, need to create user'));
  }

  res.status(200).json({
    status: 'success',
    data: allUsers,
  });
});

module.exports = {getAllUser};
