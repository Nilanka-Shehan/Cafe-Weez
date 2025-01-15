const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController");
const verifyToken = require("../middlewares/verifyToken");
const verifyRoles = require("../middlewares/verifyRoles");

router.get("/", verifyToken, verifyRoles("admin","owner"), bookingController.getAllBookings);
router.post("/", bookingController.addBooking);
router.delete(
  "/:id",
  verifyToken,
  verifyRoles("admin","owner"),
  bookingController.deleteBooking
);
router.put(
  "/:id",
  verifyToken,
  verifyRoles("admin","owner"),
  bookingController.updateBookings
);

module.exports = router;
