import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cards from "../components/Cards";
import { useAuth } from "../context/AuthContext";
import { fetchMovieDetails, fetchPopularMovies } from "../services/tmdb";

function MovieDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user: authUser, token, isAuthenticated } = useAuth();

  const [movie, setMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");

  // 🎬 Fetch current movie details
  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadMovie();
  }, [id]);

  // 🎬 Fetch movies for recommendations
  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchPopularMovies();
      setMovies(data);
    };
    loadMovies();
  }, []);

  // 📝 Fetch reviews
  useEffect(() => {
    if (!movie) return;

    fetch("http://localhost:3000/reviews")
      .then((res) => res.json())
      .then((data) => {
        const movieReviews = data.filter(
          (r) => r.movieId === movie.id
        );
        setReviews(movieReviews);
      });
  }, [movie]);

  // ✍️ Submit review
  const submitReview = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location } });
      return;
    }

    fetch("http://localhost:3000/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        movieId: movie.id,
        user: authUser?.name || authUser?.email,
        review: reviewText,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setReviewText("");
        window.location.reload();
      });
  };

  // ⛔ Prevent crash while loading
  if (!movie) {
    return <h1 style={{ color: "white" }}>Loading...</h1>;
  }

  // 🎥 Related movies
  const relatedMovies = movies
    .filter((m) => m.id !== movie.id)
    .slice(0, 6);

  return (
    <div className="container mt-5" style={{ color: "var(--text-tertiary)" }}>
      
      {/* 🎬 MOVIE DETAILS */}
      <div className="row align-items-center">
        
        <div className="col-md-4">
          <img
            src={movie.poster}
            alt={movie.title}
            style={{
              width: "100%",
              borderRadius: "15px",
            }}
          />
        </div>

        <div className="col-md-8">
          <h1 className="mb-3">{movie.title}</h1>

          <p className="fs-5" style={{ color: "var(--accent)" }}>
            ⭐ {movie.rating}/5
          </p>

          <p style={{ lineHeight: "1.8" }}>
            {movie.description}
          </p>

          <p style={{ color: "var(--text-disabled)" }}>
            <b>Release Date:</b> {movie.createdAt || "N/A"}
          </p>

          <p>
            <b>Runtime:</b> {movie.runtime || "N/A"} mins
          </p>

          <p>
            <b>Genres:</b> {movie.genres || "N/A"}
          </p>
        </div>
      </div>

      <hr className="my-5" />

      {/* 📝 REVIEWS */}
      <h3 className="mb-3">Reviews</h3>

      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews.map((r, index) => (
          <p key={index}>
            <b>{r.user}:</b> {r.review}
          </p>
        ))
      )}

      {/* ✍️ REVIEW FORM */}
      <h4 className="mt-4">Add Review</h4>

      <textarea
        placeholder="Write review..."
        className="form-control mb-2"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />

      <button className="btn btn-primary" onClick={submitReview}>
        {isAuthenticated ? "Submit Review" : "Login to Review"}
      </button>

      <hr className="my-5" />

      {/* 🎥 RECOMMENDED */}
      <h3 className="mb-4" style={{ color: "var(--text-primary)" }}>
        You Can Also See
      </h3>

      <div className="movie-scroll">
        {relatedMovies.map((m) => (
          <div className="movie-item" key={m.id}>
            <Cards {...m} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieDetails;