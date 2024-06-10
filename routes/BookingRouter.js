// import the express router
const express = require('express');
const bookingController = require('../controllers/bookingController');
// create a new router
const router = express.Router();
const auth = require('../middleware/auth');

// define the routes
// prefix: /users
router.post('/', bookingController.createBooking); // POST /users

router.get('/:id', auth.checkAuth, auth.isAdmin, bookingController.getHalls); // GET /users

router.get('/', auth.checkAuth, auth.isAdmin, bookingController.getHallsBYDate); // GET /users


/*
router.post('/login', bookingController.login); // POST /users/login

router.post('/logout', auth.checkAuth, bookingController.logout); // POST /users/logout
router.get('/profile', auth.checkAuth, bookingController.getUser); // GET /users/profile
router.put('/profile', auth.checkAuth, bookingController.updateUser); // PUT /users/profile
router.delete('/profile', auth.checkAuth, bookingController.deleteUser); // DELETE /users/profile

router.get('/:id', auth.checkAuth, auth.isAdmin, bookingController.getUserById); // GET /users/:id
router.put('/:id', auth.checkAuth, auth.isAdmin, bookingController.updateUserById); // PUT /users/:id
router.delete('/:id', auth.checkAuth, auth.isAdmin, bookingController.deleteUserById); // DELETE /users/:id
// export the router*/
module.exports = router;