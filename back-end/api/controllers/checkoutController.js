const Checkouts = require("../models/Checkout");
const mongoose = require("mongoose");

//add checkouts
const addCheckout = async (req, res) => {
  const { username, email, totalAmount, totalItems } = req.body;

  if (
    !username ||
    !email ||
    !totalAmount ||
    !totalItems ||
    totalAmount <= 0 ||
    totalItems <= 0
  ) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  try {
    const newItem = await Checkouts.create({
      username,
      email,
      totalAmount,
      totalItems,
    });
    res.status(201).json({ success: true, newItem });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed to create checkout: ${error.message}` });
  }
};

//getAll Ceckouts
const getAllCheckouts = async (req, res) => {
  try {
    const checkouts = await Checkouts.find().sort({ createdAt: -1 });
    res.status(200).json(checkouts);
  } catch (error) {
    res
      .status(400)
      .json({ message: `Failed to fetch items: ${error.message}` });
  }
};

//update checkouts
const updateCheckout = async (req, res) => {
  const { id: checkoutId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(checkoutId)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  const { username, email, totalAmount, status } = req.body;

  if (totalAmount && totalAmount <= 0) {
    return res
      .status(400)
      .json({ message: "Total amount must be greater than 0" });
  }

  try {
    const updatedCheckout = await Checkouts.findByIdAndUpdate(
      checkoutId,
      { username, email, totalAmount, status },
      { new: true, runValidators: true }
    );

    if (!updatedCheckout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    res
      .status(200)
      .json({ message: "Checkout updated successfully", updatedCheckout });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed to update checkout: ${error.message}` });
  }
};

//deleteCheckout
const deleteCheckout = async (req, res) => {
  const checkoutId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(checkoutId)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  try {
    const deletedCheckout = await Checkouts.findByIdAndDelete(checkoutId);
    if (!deletedCheckout) {
      return res.status(404).json({ message: "The Checkout cannot be found" });
    }
    res
      .status(200)
      .json({ message: "Checkout Deleted Successfully", deletedCheckout });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed to delete Checkout: ${error.message}` });
  }
};

//getSingle checkout
const getSingleCheckout = async (req, res) => {
  try {
    const { email } = req.params;
    const checkout = await Checkouts.findOne({ email});

    if (!checkout) {
      return res
        .status(404)
        .json({ success: false, message: "Checkout not found" });
    }
    res.status(200).json({
      success: true,
      checkout: {
        checkoutId: checkout._id,
        username: checkout.username,
        email: checkout.email,
        totalAmount: checkout.totalAmount,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch checkout" });
  }
};

module.exports = {
  addCheckout,
  getAllCheckouts,
  updateCheckout,
  deleteCheckout,
  getSingleCheckout,
};
