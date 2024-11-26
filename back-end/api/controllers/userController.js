const mongoose = require("mongoose");
const Users = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//create User
const signup = async (req, res) => {
  const user = req.body;

  if (!user.photoURL) {
    user.photoURL = user.username ? String(user.username).charAt(0).toUpperCase() : "U"; //default is "U"
  }

  try {
    const existingUser = await Users.findOne({ email: user.email });
    if (existingUser) {
      return res.json({ message: "User already Exist" });
    }
    const newUser = await Users.create(user);
    res.status(200).json({
      message: "Successfully added the user !!!!",
      success: true,
      user: {
        username: newUser.username,
        email: newUser.email,
        photoURL: newUser.photoURL,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    res.status(400).json({ message: `Failed to add user: ${error.message}` });
  }
};

//get single user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the user by email
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //token
    const token = jwt.sign({ id: user._id }, process.env.ACCESS_JWT_TOKEN, {
      expiresIn: "1h",
    });

    // Respond with success message and user data
    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      user: {
        username: user.username,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during login" });
  }
};

// get User 
const getUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    const formattedUsers = users.map(user => ({
      username: user.username,
      email: user.email,
      photoURL: user.photoURL,
      createdAt: user.createdAt,
    }));
    res
      .status(200)
      .json(formattedUsers);
  } catch (error) {
    res
      .status(400)
      .json({ message: `Failed to fetch users: ${error.message}` });
  }
};

//update user by Id
//Hash the password when update........................
const updateUser = async (req, res) => {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  const { name, email, password } = req.body;
  try {
    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { name, email, password },
      { new: true, runValidaters: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "The User cannot be found" });
    }
    res.status(200).json({ message: "Successfully updated User !!!!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed to update user: ${error.message}` });
  }
};

//delete User
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  try {
    const deletedUser = await Users.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "The User cannot be found" });
    }
    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed to delete user: ${error.message}` });
  }
};

module.exports = {
  signup,
  getUsers,
  updateUser,
  deleteUser,
  login,
};
