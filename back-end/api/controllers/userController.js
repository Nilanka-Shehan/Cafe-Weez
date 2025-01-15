const mongoose = require("mongoose");
const Users = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

// Google OAuth client setup
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Create User
const signup = async (req, res) => {
  const user = req.body;

  if (!user.photoURL) {
    user.photoURL = user.username
      ? String(user.username).charAt(0).toUpperCase()
      : "U"; // Default is "U"
  }

  try {
    const existingUser = await Users.findOne({ email: user.email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const newUser = await Users.create(user);
    res.status(200).json({
      message: "Successfully added the user!",
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

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Please create an account!" });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.ACCESS_JWT_TOKEN, {
      expiresIn: "10d",
    });

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

// Google Login
const googleLogin = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Token is required", success: false });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    let user = await Users.findOne({ googleId });

    if (!user) {
      user = new Users({
        googleId,
        email,
        username: name,
        photoURL: picture,
      });
      await user.save();
    }

    const authToken = jwt.sign(
      { id: user._id},
      process.env.ACCESS_JWT_TOKEN,
      { expiresIn: "10d" }
    );

    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: user.createdAt,
      },
      token: authToken,
    });
  } catch (error) {
    console.error("Error verifying Google token:", error.message);
    res.status(400).json({ message: "Invalid Google token", success: false });
  }
};

// Google Auth Callback
const googleAuthCallback = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ message: "Authorization code is missing", success: false });
  }

  try {
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    let user = await Users.findOne({ googleId });
    if (!user) {
      user = new Users({
        googleId,
        email,
        username: name,
        photoURL: picture,
      });
      await user.save();
    }

    const authToken = jwt.sign(
      { id: user._id},
      process.env.ACCESS_JWT_TOKEN,
      { expiresIn: "10d" }
    );

    res.status(200).json({
      message: "User authenticated successfully",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: user.createdAt,
      },
      token: authToken,
    });
  } catch (error) {
    console.error("Error in /auth/callback:", error.message);
    res.status(500).json({ message: "Authentication failed", success: false });
  }
};

// Other User Operations
const getUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    const formattedUsers = users.map((user) => ({
      _id: user._id,
      username: user.username,
      email: user.email,
      photoURL: user.photoURL,
      role: user.role,
      createdAt: user.createdAt,
    }));
    res.status(200).json(formattedUsers);
  } catch (error) {
    res.status(400).json({ message: `Failed to fetch users: ${error.message}` });
  }
};

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
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Successfully updated user!" });
  } catch (error) {
    res.status(500).json({ message: `Failed to update user: ${error.message}` });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  try {
    const deletedUser = await Users.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: `Failed to delete user: ${error.message}` });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      success: true,
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
        photoURL: user.photoURL,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user data" });
  }
};

const getUserRole = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user role" });
  }
};

const createAdmin = async (req, res) => {
  const userId = req.params.id;
  try {
    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { role: "admin" },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signup,
  login,
  googleLogin,
  googleAuthCallback,
  getUsers,
  updateUser,
  deleteUser,
  getSingleUser,
  getUserRole,
  createAdmin,
};
