const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const users = require('../db/models/user');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = catchAsync(async (req, res, next) => {
  const {userType, firstName, lastName, email, password, confirmPassword} =
    req.body;

  if (!['1', '2'].includes(userType)) {
    throw new AppError('Invalid user type', 400);
  }

  const user = await users.create({
    userType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  });

  if (!user) {
    return next(new AppError('Fail to create new user', 400));
  }

  const result = user.toJSON();
  delete result.password;
  delete result.deletedAt;

  result.token = generateToken({id: result.id});

  return res.status(201).json({
    status: 'success',
    data: result,
  });
});

const login = catchAsync(async (req, res, next) => {
  const {email, password} = req.body;
  if ((!email, !password)) {
    return next(new AppError('Please provid email and password', 400));
  }

  const result = await users.findOne({where: {email}});

  if (!result || !(await bcrypt.compare(password, result.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = generateToken({id: result.id});

  return res.json({
    status: 'success',
    token,
  });
});

module.exports = {signup, login};
