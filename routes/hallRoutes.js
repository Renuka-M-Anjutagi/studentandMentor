const express = require('express');
const router = express.Router();
const hallController = require('../controllers/hallController');
const auth = require('../middleware/auth');


router.get('/', hallController.getHalls);
router.get('/:hallId',auth.checkAuth, auth.isAdmin, hallController.getHallById);
router.post('/', hallController.createHall);
router.put('/:hallId',auth.checkAuth, auth.isAdmin, hallController.updateHall);
router.delete('/:hallId',auth.checkAuth, auth.isAdmin, hallController.deleteHall);

module.exports = router; 

