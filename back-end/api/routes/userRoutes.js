const express = require("express");
const router = express();
const userControllers = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");
const verifyRoles = require("../middlewares/verifyRoles");

//create user
router.post("/signup", userControllers.signup);

//getUsers
router.get("/", verifyToken, verifyRoles("admin"), userControllers.getUsers);

//updateUser
router.patch("/:id", verifyToken, userControllers.updateUser);

//deleteUser
router.delete(
  "/:id",
  verifyToken,
  verifyRoles("admin"),
  userControllers.deleteUser
);

//login
router.post("/login", userControllers.login);

//google login
router.post("/google-login", userControllers.googleLogin);

//get Sigle User
router.get("/me", verifyToken, userControllers.getSingleUser);

//getAdmin
router.get(
  "/roles",
  verifyToken,
  userControllers.getUserRole
);

//createAdmin
router.put(
  "/admin/:id",
  verifyToken,
  verifyRoles("admin"),
  userControllers.createAdmin
);

module.exports = router;
