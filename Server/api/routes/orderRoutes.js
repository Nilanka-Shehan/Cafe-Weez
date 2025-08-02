const express = require("express");
const router = express.Router();

const orderController = require("../controllers/oderController");
const verifyToken = require("../middlewares/verifyToken");
const verifyRoles = require("../middlewares/verifyRoles");

router.get("/", verifyToken, verifyRoles("admin"), orderController.getAllOrders);
router.post("/", verifyToken, orderController.addOrders);
router.delete(
  "/:id",
  verifyToken,
  verifyRoles("admin"),
  orderController.deleteOrder
);
router.put(
  "/:id",
  verifyToken,
  verifyRoles("admin"),
  orderController.updateOrder
);

module.exports = router;

