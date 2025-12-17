import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  student: { type: String, required: true },
  className: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
});

export default mongoose.model("Review", reviewSchema);
