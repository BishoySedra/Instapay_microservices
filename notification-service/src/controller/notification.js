const NotificationService = require('../services/notification');
exports.healthCheck = (req, res) => {
  res.status(200).json({ message: 'Notification Service is healthy' });
};

exports.pollNotifications = async (req, res) => {
  const userId = req.userId;
  const notifications = await NotificationService.pollNotifications(userId);
  res.status(200).json(notifications);
};

exports.getNotification = async(req, res) => {
  const { notificationId } = req.body;
  const notification = await NotificationService.getNotificationById(notificationId);
  res.status(200).json(notification);
}