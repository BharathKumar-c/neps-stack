const router = require('express').Router();
const {authentication, restrictTo} = require('../controllers/authController');
const {
  createProject,
  getAllProject,
  getProjectById,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

router.post('/', authentication, restrictTo('0'), createProject);
router.get('/', authentication, restrictTo('0'), getAllProject);
router.get('/:id', authentication, restrictTo('0'), getProjectById);
router.put('/:id', authentication, restrictTo('0'), updateProject);
router.delete('/:id', authentication, restrictTo('0'), deleteProject);

module.exports = router;
