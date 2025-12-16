import express from "express";
import Query from "../models/Query.js";

const router = express.Router();

router.post("/query", async (req, res) => {
  try {
    console.log("QUERY:", req.body);

    const q = new Query(req.body);
    await q.save();

    res.json({ message: "Query submitted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/query", (req, res) => {
    console.log(req.body);
    res.json({ message: "Query received successfully" });
});


export default router;
