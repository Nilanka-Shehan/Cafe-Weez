const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "order"
  seq: { type: Number, default: 0 }, // keeps track of the latest number
});

module.exports = mongoose.model("Counter", counterSchema);
