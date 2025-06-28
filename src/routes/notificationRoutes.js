const express = require('express');
const { apiKeyAuth } = require('../middleware/auth');
const notificationController = require('../controllers/notificationController');

const router = express.Router();

// Create notification
router.post('/', apiKeyAuth, notificationController.createNotification);

// Get notifications (filter by recipient, type, etc. via query)
router.get('/', apiKeyAuth, notificationController.getNotifications);

// Mark notification as read/unread
router.patch('/:id', apiKeyAuth, notificationController.updateNotification);

// Delete notification
router.delete('/:id', apiKeyAuth, notificationController.deleteNotification);

module.exports = router;
