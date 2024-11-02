const express = require("express");
const Menu = require("../models/Menu")
const router = express.Router();
const menuController = require("../controllers/menuController")

//add menuItems
router.post('/',menuController.addMenuItems);

//get All Menu Items
router.get('/',menuController.getAllMenuItems);

//update menuh Items 
router.patch('/:id',menuController.updateItems);

//delete menu Items
router.delete('/:id',menuController.deleteItems);

//get Single Menu Item
router.get('/:id',menuController.getSingleItem)

module.exports = router;
