const express = require("express");
const upload = require("../middlewares/upload");
const {
  addMenuItems,
  getAllMenuItems,
  updateItems,
  deleteItems,
  getSingleItem,
} = require("../controllers/menuController");
const verifyToken = require("../middlewares/verifyToken");
const verifyRoles = require("../middlewares/verifyRoles");

const router = express.Router();

router.post("/", upload.single("image"), addMenuItems);
router.get("/", getAllMenuItems);
router.put("/:id", upload.single("image"), updateItems);
router.delete("/:id", verifyToken, verifyRoles("admin"), deleteItems);
router.get("/:id", getSingleItem);

module.exports = router;
