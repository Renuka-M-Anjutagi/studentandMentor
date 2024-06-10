// import the express router
const express = require('express');
const companyController = require('../controllers/companyController');
// create a new router
const router = express.Router();
const auth = require('../middleware/auth');

// define the routes
// prefix: /users
router.post('/', companyController.createCompany); // POST /users


router.get('/', auth.checkAuth, auth.isAdmin, companyController.getCompany); // GET /users


router.get('/:id', auth.checkAuth, auth.isAdmin, companyController.getCompByID); // GET /users
router.put('/:id', auth.checkAuth, auth.isAdmin, companyController.updateCompByID); // GET /users

router.delete('/:id', auth.checkAuth, auth.isAdmin, companyController.deleteCompByID); // GET /users



// export the router
module.exports = router;