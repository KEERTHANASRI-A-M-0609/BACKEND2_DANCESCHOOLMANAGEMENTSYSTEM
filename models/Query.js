import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
  name: String,
  email: String,
  query: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Query", querySchema);
