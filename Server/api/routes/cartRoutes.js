const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
const verifyToken = require("../middlewares/verifyToken");

router.get('/',verifyToken,cartController.getAllCartByEmail);
router.post('/',verifyToken,cartController.addToCart);
router.delete('/',verifyToken,cartController.deleteCartUsingEmail);
router.delete('/:id',verifyToken,cartController.deleteCart);
router.put('/:id',verifyToken,cartController.updateCart);
router.get('/:id',verifyToken,cartController.getSingleCart);

module.exports = router;