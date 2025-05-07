const express = require('express');
const router = express.Router();
const notificationController = require('../controller/notification');
const { protect }  = require('../middlewares/protect');

router.get('/health', notificationController.healthCheck);
router.get('/', protect, notificationController.pollNotifications);
router.get('/:notificationId', protect, notificationController.getNotification);

module.exports = router;
