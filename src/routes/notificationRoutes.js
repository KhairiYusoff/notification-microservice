const express = require("express");
const { apiKeyAuth, jwtAuth } = require("../middleware/auth");
const notificationAccess = require("../middleware/notificationAccess");
const notificationController = require("../controllers/notificationController");

const router = express.Router();

router.post("/", apiKeyAuth, notificationController.createNotification);

router.get(
  "/",
  jwtAuth,
  notificationAccess,
  notificationController.getNotifications,
);

router.patch("/:id", jwtAuth, notificationController.updateNotification);

router.delete("/:id", jwtAuth, notificationController.deleteNotification);

module.exports = router;
