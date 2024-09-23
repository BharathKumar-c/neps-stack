const router = require('express').Router();
const {authentication, restrictTo} = require('../controllers/authController');
const {
  createProject,
  getAllProject,
} = require('../controllers/projectController');

router.post('/', authentication, restrictTo('0'), createProject);
router.get('/', authentication, getAllProject);

module.exports = router;
