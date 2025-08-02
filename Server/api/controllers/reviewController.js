const Reviews = require("../models/Reviews");
const mongoose = require("mongoose");

// Add Review
const addReview = async (req, res) => {
  const { name, title, content } = req.body;
  if (!name || !title || !content) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  try {
    const newReview = await Reviews.create({
      name,
      title,
      content,
    });
    res.status(201).json({ success: true, newReview });
  } catch (error) {
    res.status(500).json({ message: `Request Failed !!: ${error.message}` });
  }
};

// Get All Reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Reviews.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res
      .status(400)
      .json({ message: `Failed to fetch Reviews: ${error.message}` });
  }
};

// Delete Review
const deleteReview = async (req, res) => {
  const reviewId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  try {
    const deletedReview = await Reviews.findByIdAndDelete(reviewId);
    if (!deletedReview) {
      return res.status(404).json({ message: "The Review cannot be found" });
    }
    res
      .status(200)
      .json({ message: "Review Deleted Successfully", deletedReview });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed to delete Review: ${error.message}` });
  }
};

//Update Review
const updateReview = async (req, res) => {
  const reviewId = req.params.id;
  const state = req.body.status;
  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  if (!["pending", "accept", "reject"].includes(state)) {
    return res.status(400).json({ message: "Invalid state value" });
  }
  try {
    const updatedReview = await Reviews.findByIdAndUpdate(
      reviewId,
      { states: state },
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ message: "The Review cannot be found" });
    }
    res
      .status(200)
      .json({ message: "Review Updated Successfully", updatedReview });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed to update Review: ${error.message}` });
  }
};

//grt accepted reviews
const acceptedReviews = async (req, res) => {
  try {
    const reviews = await Reviews.find({ states: "accept" }).sort({
      createdAt: -1,
    });
    res.status(200).json(reviews);
  } catch (error) {
    res
      .status(400)
      .json({ message: `Failed to fetch accepted Reviews: ${error.message}` });
  }
};

module.exports = {
  addReview,
  getAllReviews,
  deleteReview,
  updateReview,
  acceptedReviews,
};
