import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET || "cineview-dev-secret-key",
    { expiresIn: "7d" }
  );
}

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "cineview-dev-secret-key");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

/* SIGNUP */
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are required" });
  }

  try {
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    const token = generateToken(newUser);
    const safeUser = { id: newUser.id, name: newUser.name, email: newUser.email };

    res.json({ user: safeUser, token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/* LOGIN */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);
    const safeUser = { id: user.id, name: user.name, email: user.email };

    res.json({ user: safeUser, token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/* UPDATE PROFILE */
router.put("/profile", authMiddleware, async (req, res) => {
  const { name, email, phone, password } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const emailTaken = await User.findOne({ email: email.toLowerCase(), _id: { $ne: req.user.id } });
    if (emailTaken) {
      return res.status(400).json({ message: "Email already registered" });
    }

    user.name = name;
    user.email = email.toLowerCase();
    user.phone = phone || "";

    if (password && String(password).trim().length > 0) {
      user.password = bcrypt.hashSync(password, 10);
    }

    await user.save();

    const token = generateToken(user);
    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone || "",
    };

    res.json({ user: safeUser, token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
