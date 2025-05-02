const express = require('express');
const router = express.Router();
const notificationController = require('../controller/notification');

router.get('/health', notificationController.healthCheck);
router.get('/:userId', notificationController.pollNotifications);

module.exports = router;
