// Authentication middleware for API key or JWT
require('dotenv').config();
const jwt = require('jsonwebtoken');

// API Key middleware for service-to-service communication
function apiKeyAuth(req, res, next) {
  const apiKey = req.headers['x-api-key'] || req.query.api_key;
  if (process.env.API_KEY && apiKey === process.env.API_KEY) {
    return next();
  }
  return res.status(401).json({ message: 'Invalid or missing API key' });
}

// JWT middleware for user authentication (from bank-api)
function jwtAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const cookieToken = req.cookies ? req.cookies.access_token : undefined;
  
  // Support both Bearer token and cookie-based auth
  const token = authHeader ? authHeader.split(' ')[1] : cookieToken;
  
  if (!token) {
    return res.status(401).json({ message: 'Missing authentication token' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    req.authType = 'user'; // Set auth type for access control
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid JWT token' });
  }
}

module.exports = { apiKeyAuth, jwtAuth };
