const Messages = require("../models/Messages");
const mongoose = require("mongoose");

//add Messages
const addMessage = async (req, res) => {
  const { name, email, message } = req.body;
  if (
    !name ||
    !email ||
    !message
  ) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  try {
    const newMessage = await Messages.create({
      name,
      email,
      message
    });
    res.status(201).json({ success: true, newMessage });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Request Failed !!: ${error.message}` });
  }
};

//getAll Messages
const getAllMessages = async (req, res) => {
  try {
    const messages = await Messages.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res
      .status(400)
      .json({ message: `Failed to fetch Bookings: ${error.message}` });
  }
};

//delete Messages
const deleteMessage = async (req, res) => {
  const messageId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  try {
    const deletedMessage = await Messages.findByIdAndDelete(messageId);
    if (!deletedMessage) {
      return res.status(404).json({ message: "The Booking cannot be found" });
    }
    res
      .status(200)
      .json({ message: "Booking Deleted Successfully", deletedMessage });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed to delete Booking: ${error.message}` });
  }
};

module.exports = {
 addMessage,
 getAllMessages,
 deleteMessage
};
