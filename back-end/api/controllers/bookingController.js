const Bookings = require("../models/Bookings");
const mongoose = require("mongoose");

//add Bookings
const addBooking = async (req, res) => {
  const { name, email, contactNo, date, time, event } = req.body;
  

  if (
    !name ||
    !email ||
    !contactNo ||
    !date ||
    !time
  ) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  try {
    const newBooking = await Bookings.create({
      name,
      email,
      contactNo,
      date,
      time,
      event
    });
    console.log(newBooking);
    res.status(201).json({ success: true, newBooking });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Request Failed !!: ${error.message}` });
  }
};

//getAll Bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Bookings.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res
      .status(400)
      .json({ message: `Failed to fetch Bookings: ${error.message}` });
  }
};

//update bookingss
const updateBookings = async (req, res) => {
  const { id: bookingId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  const { bookingStatus } = req.body;
  console.log(req.body)
  try {
    const updatedBooking = await Bookings.findByIdAndUpdate(
      bookingId,
      { bookingStatus:"approved"},
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res
      .status(200)
      .json({ message: "Booking updated successfully", updatedBooking });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed to update Booking: ${error.message}` });
  }
};

//deleteBooking
const deleteBooking = async (req, res) => {
  const bookingId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  try {
    const deletedBooking = await Bookings.findByIdAndDelete(bookingId);
    if (!deletedBooking) {
      return res.status(404).json({ message: "The Booking cannot be found" });
    }
    res
      .status(200)
      .json({ message: "Booking Deleted Successfully", deletedBooking });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed to delete Booking: ${error.message}` });
  }
};

module.exports = {
  addBooking,
  getAllBookings,
  updateBookings,
  deleteBooking 
};
