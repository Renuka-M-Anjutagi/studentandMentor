// import the express router
const express = require('express');
const userController = require('../controllers/userController');
// create a new router
const router = express.Router();
const auth = require('../middleware/auth');

// define the routes
router.post('/', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

// export the router
module.exports = router;