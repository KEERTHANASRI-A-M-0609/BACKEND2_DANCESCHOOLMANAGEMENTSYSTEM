// models/Trainer.js
import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  experience: { type: String, required: true },
  classes: { type: Number, default: 0 },
  rating: { type: Number, default: 5 },
}, { timestamps: true });

const Trainer = mongoose.model("Trainer", trainerSchema);
export default Trainer;
