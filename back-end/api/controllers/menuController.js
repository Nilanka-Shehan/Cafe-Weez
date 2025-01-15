const cloudinary = require("../utils/cloudinary");
const Menus = require("../models/Menu");
const mongoose = require("mongoose");

// Add Menu Item
const addMenuItems = async (req, res) => {
  const { name, code, category, price } = req.body;

  try {
    let imageUrl = null;
    let imagePublicId = null;

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path);
      imageUrl = uploadResult.secure_url;
      imagePublicId = uploadResult.public_id;
    }

    const newItem = await Menus.create({
      name,
      code,
      category,
      price,
      image: imageUrl,
      imagePublicId,
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: `Failed to add item: ${error.message}` });
  }
};

// Get All Menu Items
const getAllMenuItems = async (req, res) => {
  try {
    const items = await Menus.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res
      .status(400)
      .json({ message: `Failed to fetch items: ${error.message}` });
  }
};

// Update Menu Item
const updateItems = async (req, res) => {
  const menuId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(menuId)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  
  try {
    const existingItem = await Menus.findById(menuId);
    if (!existingItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Prepare updated data by merging with existing item
    const updatedData = {
      name: req.body.name || existingItem.name,
      code: req.body.code || existingItem.code,
      category: req.body.category || existingItem.category,
      price: req.body.price || existingItem.price,

      image: existingItem.image, // Keep current image by default
      imagePublicId: existingItem.imagePublicId,
    };

    // Handle image update if a new file is provided
    if (req.file) {
      // Delete the old image if it exists
      if (existingItem.imagePublicId) {
        try {
          await cloudinary.uploader.destroy(existingItem.imagePublicId);
        } catch (err) {
          console.warn("Failed to delete previous image:", err.message);
        }
      }

      const uploadResult = await cloudinary.uploader.upload(req.file.path);
      updatedData.image = uploadResult.secure_url;
      updatedData.imagePublicId = uploadResult.public_id;
    }

    const updatedItem = await Menus.findByIdAndUpdate(menuId, updatedData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Update error:", error);
    res
      .status(400)
      .json({ message: `Failed to update item: ${error.message}` });
  }
};

// Delete Menu Item
const deleteItems = async (req, res) => {
  const menuId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(menuId)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const item = await Menus.findByIdAndDelete(menuId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.imagePublicId)
      await cloudinary.uploader.destroy(item.imagePublicId);

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: `Failed to delete item: ${error.message}` });
  }
};

// Get Single Menu Item
const getSingleItem = async (req, res) => {
  const menuId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(menuId)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const item = await Menus.findById(menuId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed to retrieve item: ${error.message}` });
  }
};

module.exports = {
  addMenuItems,
  getAllMenuItems,
  updateItems,
  deleteItems,
  getSingleItem,
};
