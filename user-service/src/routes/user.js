const express = require('express');
const router = express.Router();
const { transfer } = require('../controllers/userController');

router.post('/transfer', transfer);

module.exports = router;
