import Review from "../models/reviewModel.js";

// GET all reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE review
export const createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(400).json({ message: err.message });
  }
};

// UPDATE review  ✅ THIS FIXES YOUR ISSUE
export const updateReview = async (req, res) => {
  try {
    const updated = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true, // 🔥 IMPORTANT
      }
    );

    if (!updated) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(400).json({ message: err.message });
  }
};

// DELETE review
export const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
