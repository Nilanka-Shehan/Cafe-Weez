const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");
const verifyToken = require("../middlewares/verifyToken");
const verifyRoles = require("../middlewares/verifyRoles");

router.get("/", verifyToken, verifyRoles("admin","owner"), reviewController.getAllReviews);
router.get(
  "/accepted-reviews",
  reviewController.acceptedReviews
);
router.post("/", reviewController.addReview);
router.delete(
  "/:id",
  verifyToken,
  verifyRoles("admin","owner"),
  reviewController.deleteReview
);
router.put(
  "/:id",
  verifyToken,
  verifyRoles("admin","owner"),
  reviewController.updateReview
);

module.exports = router;
