const mongoose = require("mongoose");
const { Schema } = mongoose;

//create a schema for menu Items
const reviews = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
  },
  title: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
  },
  content: {
    type: String,
    requred: true,
  },
  states: {
    type: String,
    enum: ["pending", "accept", "reject"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//create model
const Reviews = mongoose.model("Reviews", reviews);
module.exports = Reviews;
