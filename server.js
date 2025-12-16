import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import eventRoutes from "./routes/eventRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

import trainerRoutes from "./routes/trainerRoutes.js";


// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/reviews", reviewRoutes); // ✅ FIXED (NO require)
app.use("/api/events", eventRoutes);
app.use('/api/trainers', trainerRoutes);


// =======================
// CLASSES (INLINE MODEL)
// =======================
const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, default: "Beginner" },
  duration: { type: String, default: "60" },
  instructor: String,
  description: String,
  timings: String,
  fee: String,
  age: String,
  image: String,
});

const Class = mongoose.model("Class", classSchema);

app.get("/api/classes", async (req, res) => {
  const classes = await Class.find();
  res.json(classes);
});

app.post("/api/classes", async (req, res) => {
  const cls = new Class(req.body);
  await cls.save();
  res.json(cls);
});

app.put("/api/classes/:id", async (req, res) => {
  const updated = await Class.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

app.delete("/api/classes/:id", async (req, res) => {
  await Class.findByIdAndDelete(req.params.id);
  res.json({ message: "Class deleted" });
});

// =======================
// MongoDB Atlas
// =======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.error("Mongo error:", err));

// =======================
// Start Server
// =======================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

