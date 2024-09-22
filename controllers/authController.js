const users = require('../db/models/user');

const signup = async (req, res, next) => {
  const {userType, firstName, lastName, email, password} = req.body;

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
  });

  if (!user) {
    return res.status(400).json({
      status: 'fail',
      message: 'Fail to create new user',
    });
  }

  return res.status(201).json({
    status: 'success',
    data: user,
  });
};

module.exports = {signup};
