const router = require('express').Router();
const {createProject} = require('../controllers/projectController');

router.post('/', createProject);

module.exports = router;
