require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { default: mongoose } = require("mongoose");
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"], // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware to set COOP and COEP headers
app.use((req, res, next) => {
  res.removeHeader("Cross-Origin-Opener-Policy"); // Removed COOP for compatibility
  res.removeHeader("Cross-Origin-Embedder-Policy"); // Removed COEP for compatibility
  next();
});

// Connect to the database
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process on failure
  });

// Connect routes
const menuRoutes = require("./api/routes/menuRoutes");
const userRoutes = require("./api/routes/userRoutes");
const cartRoutes = require("./api/routes/cartRoutes");
const checkoutRoutes = require("./api/routes/checkoutRoutes");
const bookingRoutes = require("./api/routes/bookingRoutes");
const messageRoutes = require("./api/routes/messageRoutes");

app.use("/menu", menuRoutes);
app.use("/user", userRoutes);
app.use("/carts", cartRoutes);
app.use("/checkouts", checkoutRoutes);
app.use("/bookings", bookingRoutes);
app.use("/messages", messageRoutes);

// Start the server
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
