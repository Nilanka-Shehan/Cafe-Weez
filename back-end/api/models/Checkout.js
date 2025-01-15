const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderDetails = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "success"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Checkouts = mongoose.model("Checkouts", orderDetails);
module.exports = Checkouts;
