const NotificationService = require('../services/notification');
exports.healthCheck = (req, res) => {
  res.status(200).json({ message: 'Notification Service is healthy' });
};

exports.pollNotifications = async (req, res) => {
  const { userId } = req.params;
  const notifications = await NotificationService.pollNotifications(userId);
  res.status(200).json(notifications);
};