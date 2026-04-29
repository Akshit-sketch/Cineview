import express from "express";
import Review from "../models/Review.js";
import { authMiddleware } from "./auth.js";

const router = express.Router();

/* GET REVIEWS */
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/* ADD REVIEW */
router.post("/", authMiddleware, async (req, res) => {
  const review = req.body;

  if (!review || !review.movieId || !review.review) {
    return res.status(400).json({ message: "movieId and review text are required" });
  }

  try {
    const fullReview = {
      movieId: review.movieId,
      userId: req.user.id,
      user: review.user || req.user.name || req.user.email,
      review: review.review,
      title: review.title || undefined,
      rating: review.rating || undefined,
    };

    await Review.create(fullReview);
    res.json({ message: "Review added" });
  } catch (err) {
    res.status(500).json({ message: "Error saving review", error: err.message });
  }
});

export default router;
