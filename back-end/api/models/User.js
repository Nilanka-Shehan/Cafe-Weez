const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const users = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128,
    trim: true,
  },

  photoURL: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// Add password hashing middleware
users.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // Skip if the password field hasn't been modified
  }

  if (!this.password) {
    console.error("Password is undefined!");
    throw new Error("Password must be provided before saving");
  }

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    console.error("Error hashing password:", err);
    next(err);
  }
});

const Users = mongoose.model("User", users);
module.exports = Users;
