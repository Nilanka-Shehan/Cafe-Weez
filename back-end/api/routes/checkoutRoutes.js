const express = require("express");
const router = express.Router();

const checkoutController = require("../controllers/checkoutController");
const verifyToken = require("../middlewares/verifyToken");
const verifyRoles = require("../middlewares/verifyRoles");

router.get("/", verifyToken, verifyRoles("admin","cashier"), checkoutController.getAllCheckouts);
router.post("/", verifyToken, checkoutController.addCheckout);
router.delete(
  "/:id",
  verifyToken,
  verifyRoles("cashier"),
  checkoutController.deleteCheckout
);
router.put(
  "/:id",
  verifyToken,
  verifyRoles("cashier"),
  checkoutController.updateCheckout
);
router.get(
  "/:email",
  verifyToken,
  checkoutController.getSingleCheckout
);

module.exports = router;
