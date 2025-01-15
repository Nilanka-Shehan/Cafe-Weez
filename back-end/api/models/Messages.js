const mongoose = require("mongoose");
const { Schema } = mongoose;

//create a schema for menu Items
const messages = new Schema({
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
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
  },
  message: {
    type: String,
    requred: true,
  },
});

//create model
const Messages = mongoose.model("Messages", messages);
module.exports = Messages;
