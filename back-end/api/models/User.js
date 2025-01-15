const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const users = new Schema({
  username: {
    type: String,
    trim: true,
    required: function () {
      // Require username only if the user is not created via Google
      return !this.googleId;
    },
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
    required: function () {
      // Password is required only if the user is not created via Google
      return !this.googleId;
    },
    minlength: 6,
    maxlength: 128,
    trim: true,
  },

  googleId: {
    type: String,
    unique: true,
    sparse: true, // Allows null values for non-Google users
  },

  photoURL: {
    type: String,
  },

  role: {
    type: String,
    enum: ["user", "admin", "cashier", "owner"],
    default: "user",
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
    return next(); // Allow saving Google users without a password
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
