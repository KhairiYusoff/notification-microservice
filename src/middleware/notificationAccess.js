const notificationAccess = (req, res, next) => {
  const { recipientId, recipientRole } = req.query;

  // JWT users need strict access rules, API keys blocked from user data
  if (req.authType === "user" && req.user) {
    // Extract normalized user data from JWT payload
    const userObj = req.user;
    const userRole = userObj.role || "customer";
    const userId = userObj.id;

    // Users can only access their own notifications for privacy
    if (recipientId && recipientId !== userId) {
      return res.status(403).json({
        message: "Access denied. You can only view your own notifications",
      });
    }

    // Auto-populate user ID for customer/banker self-access
    if ((userRole === "customer" || userRole === "banker") && !recipientId) {
      req.query.recipientId = userId;
    }

    // Admins need full access for audit and management
    if (userRole === "admin") {
      return next();
    }

    // Prevent role-based bulk access (security measure)
    if (recipientRole && !recipientId) {
      return res.status(403).json({
        message: "Access denied. Cannot access notifications by role only",
      });
    }
  }

  // API keys cannot access user notification data (privacy protection)
  if (req.authType === "service") {
    return res.status(403).json({
      message: "Access denied. API keys cannot access notification data",
    });
  }

  next();
};

module.exports = notificationAccess;
