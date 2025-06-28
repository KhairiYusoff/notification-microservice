require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Health check route
app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/notifications", notificationRoutes);

// Connect to MongoDB and start server
const startServer = async () => {
  await connectDB();
  const port = process.env.PORT || 4001;
  app.listen(port, () =>
    console.log(`Notification service running on port ${port}`)
  );
};

startServer();
