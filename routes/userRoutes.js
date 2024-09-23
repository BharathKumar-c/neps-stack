const {authentication, restrictTo} = require('../controllers/authController');
const {getAllUser} = require('../controllers/userController');

const router = require('express').Router();

router.get('/', authentication, restrictTo('0'), getAllUser);

module.exports = router;
