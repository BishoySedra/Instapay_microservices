const express = require('express');
const router = express.Router();
const { getSummary } = require('../controllers/report');

router.get('/summary/:userId', getSummary);

module.exports = router;
