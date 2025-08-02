const express = require("express");
const router = express.Router();

const messageController = require("../controllers/messageController");
const verifyToken = require("../middlewares/verifyToken");
const verifyRoles = require("../middlewares/verifyRoles");

router.get("/", verifyToken, verifyRoles("admin","owner"), messageController.getAllMessages);
router.post("/", messageController.addMessage);
router.delete(
  "/:id",
  verifyToken,
  verifyRoles("admin","owner"),
  messageController.deleteMessage
);

module.exports = router;
