const mongoose = require("mongoose");
const { Schema } = mongoose;

const menuItems = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  category: String,
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  imagePublicId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Menus = mongoose.model("Menu", menuItems);
module.exports = Menus;
