const express = require("express");
const router = express();
const userControllers = require("../controllers/userController");
const verfyToken = require("../middlewares/verifyToken");


//create user
router.post("/signup", userControllers.signup);

//getUsers
router.get("/", verfyToken, userControllers.getUsers);

//updateUser
router.patch("/:id", userControllers.updateUser);

//deleteUser
router.delete("/:id", userControllers.deleteUser);

//login
router.post("/login", userControllers.login);


module.exports = router;
