const express = require('express');
const router = express.Router();
const { getSummary } = require('../controllers/report');
const { protect } = require('../middlewares/protect');
router.get('/summary', protect, getSummary);

module.exports = router;
