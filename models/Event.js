import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  performers: Number,
  status: {
    type: String,
    enum: ["Upcoming", "Ongoing", "Completed", "Cancelled"],
    default: "Upcoming",
  },
  guest: String,
  performances: String,
  highlights: String,
  tickets: String,
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);
