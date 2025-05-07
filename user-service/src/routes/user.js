const express = require('express');
const router = express.Router();
const { transfer, getUser } = require('../controllers/userController');

router.post('/transfer', transfer);
router.get('/me', getUser);

module.exports = router;
