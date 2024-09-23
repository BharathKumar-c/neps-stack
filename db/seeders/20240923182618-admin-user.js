const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let password = process.env.ADMIN_PASSWORD;
    const hashPassword = await bcrypt.hashSync(password, 10);
    return queryInterface.bulkInsert('users', [
      {
        userType: '0',
        firstName: 'John',
        lastName: 'Doe',
        email: process.env.ADMIN_EMAIL,
        password: hashPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', {userType: '0'}, {});
  },
};
