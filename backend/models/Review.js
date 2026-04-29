import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    movieId: { type: String, required: true },
    user: { type: String, required: true }, // Display name
    userId: { type: String, required: true },
    review: { type: String, required: true },
    title: { type: String },
    rating: { type: Number },
  },
  { timestamps: true }
);

reviewSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
