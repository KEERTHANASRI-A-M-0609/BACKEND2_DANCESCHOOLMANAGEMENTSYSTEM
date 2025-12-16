import express from "express";
import Class from "../models/Class.js";

const router = express.Router();

// GET all classes
router.get("/classes", async (req, res) => {
  const classes = await Class.find();
  res.json(classes);
});

// ADD class
router.post("/classes", async (req, res) => {
  const newClass = new Class(req.body);
  await newClass.save();
  res.json(newClass);
});

// UPDATE class
router.put("/classes/:id", async (req, res) => {
  const updated = await Class.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE class
router.delete("/classes/:id", async (req, res) => {
  await Class.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
