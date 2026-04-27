const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;

const JWT_SECRET = "cineview-dev-secret-key";

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

const reviewsFilePath = path.join(__dirname, "reviews.json");
const usersFilePath = path.join(__dirname, "users.json");
const dataFilePath = path.join(__dirname, "data.json");

function readJsonFileSafe(filePath, fallback = []) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    const data = fs.readFileSync(filePath, "utf8");
    if (!data) return fallback;
    return JSON.parse(data);
  } catch {
    return fallback;
  }
}

function writeJsonFile(filePath, data) {
  return fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function sanitizeMoviePayload(movie) {
  if (!movie || !movie.id || !movie.title || !movie.poster) return null;
  return {
    id: movie.id,
    title: movie.title,
    poster: movie.poster,
    rating: movie.rating ?? null,
    description: movie.description || "",
    createdAt: movie.createdAt || new Date().toISOString(),
  };
}

function updateCollection(list = [], movie, action = "toggle") {
  const exists = list.some((item) => String(item.id) === String(movie.id));
  const shouldAdd =
    action === "add" || (action === "toggle" && !exists);
  const shouldRemove =
    action === "remove" || (action === "toggle" && exists);

  if (shouldAdd && !exists) return [...list, movie];
  if (shouldRemove) {
    return list.filter((item) => String(item.id) !== String(movie.id));
  }
  return list;
}

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

/* SIGNUP */
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are required" });
  }

  const users = readJsonFileSafe(usersFilePath, []);
  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword,
  };

  users.push(newUser);
  writeJsonFile(usersFilePath, users);

  const token = generateToken(newUser);
  const safeUser = { id: newUser.id, name: newUser.name, email: newUser.email };

  res.json({ user: safeUser, token });
});

/* LOGIN */
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const users = readJsonFileSafe(usersFilePath, []);
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

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
});

/* UPDATE PROFILE (AUTH REQUIRED) */
app.put("/profile", authMiddleware, (req, res) => {
  const { name, email, phone, password } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  const users = readJsonFileSafe(usersFilePath, []);
  const currentUserIndex = users.findIndex((u) => String(u.id) === String(req.user.id));

  if (currentUserIndex < 0) {
    return res.status(404).json({ message: "User not found" });
  }

  const emailTaken = users.some(
    (u, idx) =>
      idx !== currentUserIndex &&
      u.email.toLowerCase() === String(email).toLowerCase()
  );

  if (emailTaken) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const existingUser = users[currentUserIndex];
  const updatedUser = {
    ...existingUser,
    name,
    email,
    phone: phone || "",
  };

  if (password && String(password).trim().length > 0) {
    updatedUser.password = bcrypt.hashSync(password, 10);
  }

  users[currentUserIndex] = updatedUser;
  writeJsonFile(usersFilePath, users);

  const token = generateToken(updatedUser);
  const safeUser = {
    id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
    phone: updatedUser.phone || "",
  };

  res.json({ user: safeUser, token });
});

/* GET REVIEWS */
app.get("/reviews", (req, res) => {
  const reviews = readJsonFileSafe(reviewsFilePath, []);
  res.json(reviews);
});

/* ADD REVIEW (AUTH REQUIRED) */
app.post("/reviews", authMiddleware, (req, res) => {
  const review = req.body;

  if (!review || !review.movieId || !review.review) {
    return res.status(400).json({ message: "movieId and review text are required" });
  }

  const reviews = readJsonFileSafe(reviewsFilePath, []);

  const fullReview = {
    ...review,
    userId: req.user.id,
    user: review.user || req.user.name || req.user.email,
    createdAt: new Date().toISOString(),
  };

  reviews.push(fullReview);
  try {
    writeJsonFile(reviewsFilePath, reviews);
    res.json({ message: "Review added" });
  } catch (err) {
    res.status(500).send("Error saving review");
  }
});

/* LIKED */
app.get("/liked", (req, res) => {
  const data = readJsonFileSafe(dataFilePath, { liked: [], wishlist: [] });
  res.json(data.liked || []);
});

app.post("/liked", (req, res) => {
  const { movie, action = "toggle" } = req.body || {};
  const safeMovie = sanitizeMoviePayload(movie);
  if (!safeMovie) {
    return res
      .status(400)
      .json({ message: "movie with id, title and poster is required" });
  }

  const data = readJsonFileSafe(dataFilePath, { liked: [], wishlist: [] });
  const nextLiked = updateCollection(data.liked || [], safeMovie, action);
  const nextData = { ...data, liked: nextLiked };
  writeJsonFile(dataFilePath, nextData);

  res.json(nextLiked);
});

/* WISHLIST */
app.get("/wishlist", (req, res) => {
  const data = readJsonFileSafe(dataFilePath, { liked: [], wishlist: [] });
  res.json(data.wishlist || []);
});

app.post("/wishlist", (req, res) => {
  const { movie, action = "toggle" } = req.body || {};
  const safeMovie = sanitizeMoviePayload(movie);
  if (!safeMovie) {
    return res
      .status(400)
      .json({ message: "movie with id, title and poster is required" });
  }

  const data = readJsonFileSafe(dataFilePath, { liked: [], wishlist: [] });
  const nextWishlist = updateCollection(data.wishlist || [], safeMovie, action);
  const nextData = { ...data, wishlist: nextWishlist };
  writeJsonFile(dataFilePath, nextData);

  res.json(nextWishlist);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});