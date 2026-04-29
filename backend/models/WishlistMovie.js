import mongoose from "mongoose";

const wishlistMovieSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  poster: String,
  rating: Number,
  description: String,
  createdAt: String,
});

wishlistMovieSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const WishlistMovie = mongoose.model("WishlistMovie", wishlistMovieSchema);
export default WishlistMovie;
