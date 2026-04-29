import express from "express";
import LikedMovie from "../models/LikedMovie.js";
import WishlistMovie from "../models/WishlistMovie.js";

const router = express.Router();

function sanitizeMoviePayload(movie) {
  if (!movie || !movie.id || !movie.title || !movie.poster) return null;
  return {
    id: String(movie.id),
    title: movie.title,
    poster: movie.poster,
    rating: movie.rating ?? null,
    description: movie.description || "",
    createdAt: movie.createdAt || new Date().toISOString(),
  };
}

/* LIKED */
router.get("/liked", async (req, res) => {
  try {
    const liked = await LikedMovie.find();
    res.json(liked);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/liked", async (req, res) => {
  const { movie, action = "toggle" } = req.body || {};
  const safeMovie = sanitizeMoviePayload(movie);
  
  if (!safeMovie) {
    return res.status(400).json({ message: "movie with id, title and poster is required" });
  }

  try {
    const existing = await LikedMovie.findOne({ id: safeMovie.id });
    
    const shouldAdd = action === "add" || (action === "toggle" && !existing);
    const shouldRemove = action === "remove" || (action === "toggle" && existing);

    if (shouldAdd && !existing) {
      await LikedMovie.create(safeMovie);
    } else if (shouldRemove && existing) {
      await LikedMovie.deleteOne({ id: safeMovie.id });
    }

    const nextLiked = await LikedMovie.find();
    res.json(nextLiked);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* WISHLIST */
router.get("/wishlist", async (req, res) => {
  try {
    const wishlist = await WishlistMovie.find();
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/wishlist", async (req, res) => {
  const { movie, action = "toggle" } = req.body || {};
  const safeMovie = sanitizeMoviePayload(movie);
  
  if (!safeMovie) {
    return res.status(400).json({ message: "movie with id, title and poster is required" });
  }

  try {
    const existing = await WishlistMovie.findOne({ id: safeMovie.id });
    
    const shouldAdd = action === "add" || (action === "toggle" && !existing);
    const shouldRemove = action === "remove" || (action === "toggle" && existing);

    if (shouldAdd && !existing) {
      await WishlistMovie.create(safeMovie);
    } else if (shouldRemove && existing) {
      await WishlistMovie.deleteOne({ id: safeMovie.id });
    }

    const nextWishlist = await WishlistMovie.find();
    res.json(nextWishlist);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
