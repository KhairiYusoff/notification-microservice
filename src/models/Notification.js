const mongoose = require('mongoose');

/**
 * Notification Schema
 * - type: type of event (e.g., application_approved, deposit_completed)
 * - title: short title for the notification
 * - message: main notification text
 * - link: URL for action or details
 * - recipient: { role, userId } (supports admin, banker, customer, etc.)
 * - source: { service, id } (originating service and entity)
 * - data: extra metadata (object)
 * - read: has the recipient read this notification?
 * - delivered: was it delivered (for multi-channel)?
 * - timestamps: createdAt, updatedAt
 */
const NotificationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    default: '',
  },
  recipient: {
    role: { type: String, required: true }, 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  },
  source: {
    service: { type: String, required: true },
    id: { type: String, required: false },
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  read: {
    type: Boolean,
    default: false,
  },
  delivered: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);
