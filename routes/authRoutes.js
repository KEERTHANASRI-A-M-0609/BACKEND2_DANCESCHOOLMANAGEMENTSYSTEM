import express from "express";
import { signupUser, loginUser } from "../controllers/authController.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);

// Register
router.post("/register", async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ error: "User not found" });
        if (user.password !== req.body.password) return res.status(400).json({ error: "Invalid credentials" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


export default router;
