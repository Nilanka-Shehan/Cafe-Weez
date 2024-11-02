const Menus = require("../models/Menu");
const mongoose = require("mongoose")

//add Menu Items
const addMenuItems = async (req, res) => {
  const newItems = req.body;
  try {
    const result = await Menus.create(newItems);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: `Failed to add item: ${error.message}` });
  }
};

//get All menu Items
const getAllMenuItems = async (req, res) => {
  try {
    const menus = await Menus.find({}).sort({ createdAt: -1 });
    res.status(200).json(menus);
  } catch (error) {
    res.status(400).json({ message: `Failed to fetch items: ${error.message}` });
  }
};

//update Menu item using Id
const updateItems = async (req, res) => {
  const menuId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(menuId)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  const { name, image, category, price } = req.body;
  try {
    const updatedMenuItem = await Menus.findByIdAndUpdate(
      menuId,
      { name, image, category, price },
      { new: true, runValidators: true }
    );
    if(!updatedMenuItem){
        return res.status(404).json({message:"The Item cannot be found"})
    }
    res.status(200).json({message:"Item is updated Successfully"})
  } catch (error) {
    res.status(500).json({ message: `Failed to update item: ${error.message}` });
  }
};

//delete Item using ID
const deleteItems = async(req,res) => {
    const itemID = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(itemID)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    try {
        const deletedItem = await Menus.findByIdAndDelete(itemID);
        if(!deletedItem){
            return res.status(404).json({message:"The Item cannot be found"});
        }
        res.status(200).json({message:"Item is deleted Successfully"});
    } catch (error) {
      res.status(400).json({ message: `Failed to delete item: ${error.message}` });
    }
}

//get SingleItem by Id
const getSingleItem = async(req,res) => {
    const itemId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    try {
        const item = await Menus.findById(itemId);
        if(!item){
            return res.status(404).json({message:"The Item cannot be found"});
        }
        res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ message: `Failed to retrieve item: ${error.message}` });
    }
}

module.exports = {
    addMenuItems,
    getAllMenuItems,
    updateItems,
    deleteItems,
    getSingleItem
}