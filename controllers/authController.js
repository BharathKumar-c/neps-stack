const jwt = require('jsonwebtoken');
const users = require('../db/models/user');

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = async (req, res, next) => {
  const {userType, firstName, lastName, email, password, confirmPassword} =
    req.body;

  if (!['1', '2'].includes(userType)) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid user type',
    });
  }

  const user = await users.create({
    userType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  });

  const result = user.toJSON();
  delete result.password;
  delete result.deletedAt;

  result.token = generateToken({id: result.id});

  if (!result) {
    return res.status(400).json({
      status: 'fail',
      message: 'Fail to create new user',
    });
  }

  return res.status(201).json({
    status: 'success',
    data: result,
  });
};

module.exports = {signup};
