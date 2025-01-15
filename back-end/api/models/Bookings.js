const mongoose = require("mongoose");
const { Schema } = mongoose;

//create a schema for menu Items
const bookingDetails = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
  },
  contactNo: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
    match: [/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time (HH:MM)'],
  },
  bookingStatus: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending"
  },
  event: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//create model
const Bookings = mongoose.model("Booking", bookingDetails);
module.exports = Bookings;
