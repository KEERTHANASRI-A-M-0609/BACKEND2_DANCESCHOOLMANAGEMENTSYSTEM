import User from "../models/User.js";
import bcrypt from "bcryptjs";

// SIGNUP
export const signupUser = async (req, res) => {
  try {
    console.log("SIGNUP:", req.body);

    const { name, email, phone, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({ message: "Signup successful" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    console.log("LOGIN:", req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    user.lastLogin = new Date();
    await user.save();

    res.json({ message: "Login successful", name: user.name });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
