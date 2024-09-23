const router = require('express').Router();
const {authentication} = require('../controllers/authController');
const {createProject} = require('../controllers/projectController');

router.post('/', authentication, createProject);

module.exports = router;
