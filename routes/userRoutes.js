// import the express router
const express = require('express');
const userController = require('../controllers/userController');
// create a new router
const router = express.Router();
const auth = require('../middleware/auth');

// define the routes
// prefix: /users
router.post('/', userController.register); // POST /users
router.post('/login', userController.login); // POST /users/login

router.post('/logout', auth.checkAuth, userController.logout); // POST /users/logout
router.get('/profile', auth.checkAuth, userController.getUser); // GET /users/profile

router.put('/profile', auth.checkAuth, userController.updateUser); // GET /users/updateUser
router.put('/profile', auth.checkAuth, userController.deleteUser); // GET /users/profile
// export the router
module.exports = router;