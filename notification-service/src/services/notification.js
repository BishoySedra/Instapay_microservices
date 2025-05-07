const Notification =  require('../models/notification');

exports.createNotification = async (notificationData) => {
  try {
    const notification = new Notification(notificationData);
    await notification.save();
    return notification;
  } catch (error) {
    throw error;
  }
};

exports.pollNotifications = async (userId, timeout = 60000) => {
  const startTime = Date.now();
  const pollInterval = 7500; // Check every 7.5 seconds

  while (Date.now() - startTime < timeout) {
    const notifications = await Notification.find({ userId, read: false }).sort({ createdAt: -1 });
    if (notifications.length > 0) {
      // Mark notifications as read
      await Notification.updateMany({ userId, read: false }, { read: true });
      return notifications;
    }
    // Wait before next check
    await new Promise((resolve) => setTimeout(resolve, pollInterval));
  }
  return []; // Return empty array on timeout
}

exports.getNotificationById = async (id) => {
  try {
    const notification = await Notification.findById(id);
    if (!notification) {
      throw new Error('Notification not found');
    }
    return notification;
  } catch (error) {
    throw error;
  }
}