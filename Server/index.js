require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { default: mongoose } = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

// Port
const port = process.env.PORT || 3001;
const allowedOrigins = [
  "http://localhost:5173",
  "https://8bf66de24435.ngrok-free.app" //ngork tunel-frontend
];

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins, // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true,
  })
);

//Proxcy calls
app.post("/api/route", async (req, res) => {
  try {
    const [from, to] = req.body.coordinates;

    const response = await fetch("https://api.openrouteservice.org/v2/directions/driving-car/geojson", {
      method: "POST",
      headers: {
        "Authorization": process.env.ORS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ coordinates: [from, to] }),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("🔥 ORS route error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Remove COOP & COEP headers for browser map compatibility
app.use((req, res, next) => {
  res.removeHeader("Cross-Origin-Opener-Policy");
  res.removeHeader("Cross-Origin-Embedder-Policy");
  next();
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });

// Import routes
const menuRoutes = require("./api/routes/menuRoutes");
const userRoutes = require("./api/routes/userRoutes");
const cartRoutes = require("./api/routes/cartRoutes");
const orderRoutes = require("./api/routes/orderRoutes");
const bookingRoutes = require("./api/routes/bookingRoutes");
const messageRoutes = require("./api/routes/messageRoutes");
const reviewRoutes = require("./api/routes/reviewRoutes");

// Use routes
app.use("/api/menu", menuRoutes);
app.use("/api/user", userRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/reviews", reviewRoutes);

// Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Handle socket events
io.on("connection", (socket) => {
  console.log("📡 Socket connected:", socket.id);

  // Listen for order room join
  socket.on("joinOrderRoom", (orderId) => {
    socket.join(orderId);
    console.log(`👤 Socket ${socket.id} joined room: ${orderId}`);
  });

  // Driver location update → emit only to the relevant room
  socket.on("locationUpdate", (data) => {
    console.log("📍 Location update received:", data);

    // Broadcast only to the order room
    io.to(data.orderId).emit("driverLocation", data);
  });

  socket.on("disconnect", () => {
    console.log("⚠️ Socket disconnected:", socket.id);
  });
});

// Start server
server.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
