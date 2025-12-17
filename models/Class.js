import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: String,
  duration: String,
  instructor: String,
  description: String,
  timings: String,
  fee: String,
  age: String,
  image: String,
}, { timestamps: true });

export default mongoose.model("Class", classSchema);
