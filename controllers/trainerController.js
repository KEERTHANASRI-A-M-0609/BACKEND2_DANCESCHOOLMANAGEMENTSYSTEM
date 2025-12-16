import Trainer from "../models/trainerModel.js";

export const getTrainers = async (req, res) => {
  const trainers = await Trainer.find().sort({ createdAt: -1 });
  res.json(trainers);
};

export const addTrainer = async (req, res) => {
  const trainer = new Trainer(req.body);
  await trainer.save();
  res.status(201).json(trainer);
};

export const updateTrainer = async (req, res) => {
  const updated = await Trainer.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

export const deleteTrainer = async (req, res) => {
  await Trainer.findByIdAndDelete(req.params.id);
  res.json({ message: "Trainer deleted" });
};
