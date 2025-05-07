const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../controllers/authController');

router.get('/me', protect, userController.getUser);
router.get('update', protect, userController.updateBalance);
module.exports = router;
