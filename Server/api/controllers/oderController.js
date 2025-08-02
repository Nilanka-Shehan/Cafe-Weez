const Orders = require("../models/Orders");

const getAllOrders = async (req, res) => {
  try {
    const totalOrders = await Orders.find().sort({ createdAt: -1 });
    res.status(200).json(totalOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add Orders
const addOrders = async (req, res) => {
  try {
    const orderData = req.body;
    if (!orderData.cartItems || !Array.isArray(orderData.cartItems)) {
      return res.status(400).json({ error: "Invalid cart items." });
    }
    const newOrder = await Orders.create(orderData);
    res
      .status(201)
      .json({
        success: true,
        message: "Successfully added the order",
        newOrder,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete Orders
const deleteOrder = async (req, res) => {
  const orderId = req.params.id;
  try {
    const deletedOrder = await Orders.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      res.status(401).json({ message: "Order is not found!" });
    }
    res
      .status(200)
      .json({ message: "Order is deleted successfully !!", deletedCount: 1 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Approve Orders
const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updateData = req.body;

    console.log(updateData)

    const updatedOrder = await Orders.findByIdAndUpdate(orderId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res
      .status(200)
      .json({ message: "Order updated successfully", updatedOrder });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Error updating order", error });
  }
};

module.exports = {
  getAllOrders,
  addOrders,
  deleteOrder,
  updateOrder,
};
