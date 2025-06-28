const Notification = require('../models/Notification');

// Create a new notification
exports.createNotification = async (req, res) => {
  try {
    const notif = await Notification.create(req.body);
    return res.status(201).json({ message: 'Notification created', data: notif });
  } catch (err) {
    return res.status(400).json({ message: 'Error creating notification', error: err.message });
  }
};

// Get notifications (with optional filters)
exports.getNotifications = async (req, res) => {
  try {
    const filter = {};
    if (req.query.recipientRole) filter['recipient.role'] = req.query.recipientRole;
    if (req.query.recipientId) filter['recipient.userId'] = req.query.recipientId;
    if (req.query.type) filter.type = req.query.type;
    if (req.query.read) filter.read = req.query.read === 'true';
    const notifs = await Notification.find(filter).sort({ createdAt: -1 });
    return res.json({ data: notifs });
  } catch (err) {
    return res.status(400).json({ message: 'Error fetching notifications', error: err.message });
  }
};

// Update notification (mark as read/unread)
exports.updateNotification = async (req, res) => {
  try {
    const notif = await Notification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!notif) return res.status(404).json({ message: 'Notification not found' });
    return res.json({ message: 'Notification updated', data: notif });
  } catch (err) {
    return res.status(400).json({ message: 'Error updating notification', error: err.message });
  }
};

// Delete notification
exports.deleteNotification = async (req, res) => {
  try {
    const notif = await Notification.findByIdAndDelete(req.params.id);
    if (!notif) return res.status(404).json({ message: 'Notification not found' });
    return res.json({ message: 'Notification deleted' });
  } catch (err) {
    return res.status(400).json({ message: 'Error deleting notification', error: err.message });
  }
};
