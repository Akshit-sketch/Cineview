import mongoose from "mongoose";

const likedMovieSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  poster: String,
  rating: Number,
  description: String,
  createdAt: String,
});

// Since the frontend uses 'id' and not '_id', we map it.
// However, the document's own 'id' field stores the TMDB ID, which is what the frontend relies on.
likedMovieSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const LikedMovie = mongoose.model("LikedMovie", likedMovieSchema);
export default LikedMovie;
