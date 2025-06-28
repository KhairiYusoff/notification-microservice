// Authentication middleware for API key or JWT
require('dotenv').config();
const jwt = require('jsonwebtoken');

// API Key middleware
function apiKeyAuth(req, res, next) {
  const apiKey = req.headers['x-api-key'] || req.query.api_key;
  if (process.env.API_KEY && apiKey === process.env.API_KEY) {
    return next();
  }
  return res.status(401).json({ message: 'Invalid or missing API key' });
}

// JWT middleware (optional, for future extensibility)
function jwtAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid Authorization header' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.service = decoded; // Attach payload to request
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid JWT token' });
  }
}

module.exports = { apiKeyAuth, jwtAuth };
