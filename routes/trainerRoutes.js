// server.js (or a separate trainersRoutes.js)
import express from "express";
import Trainer from "../models/trainerModel.js"; // Mongoose model

const router = express.Router();

// Get all trainers
router.get("/", async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.json(trainers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new trainer
router.post("/", async (req, res) => {
  try {
    const newTrainer = new Trainer(req.body);
    await newTrainer.save();
    res.status(201).json(newTrainer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update trainer
router.put("/:id", async (req, res) => {
  try {
    const updated = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete trainer
router.delete("/:id", async (req, res) => {
  try {
    await Trainer.findByIdAndDelete(req.params.id);
    res.json({ message: "Trainer deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
