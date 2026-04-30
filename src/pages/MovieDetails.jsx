import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cards from "../components/Cards";
import { useAuth } from "../context/AuthContext";
import { fetchMovieDetails, fetchPopularMovies, fetchMovieTrailer } from "../services/tmdb";
import Modal from "react-bootstrap/Modal";
import { formatDistanceToNow } from "date-fns";

function MovieDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user: authUser, token, isAuthenticated } = useAuth();

  const [movie, setMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");

  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);

  const handlePlayTrailer = async () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location } });
      return;
    }
    const key = await fetchMovieTrailer(id);
    if (key) {
      setTrailerKey(key);
      setShowTrailer(true);
    } else {
      alert("Trailer not found!");
    }
  };

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
          (r) => String(r.movieId) === String(movie.id)
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

          <button className="btn btn-primary mt-3 mb-4" onClick={handlePlayTrailer}>
            <i className="bi bi-play-fill me-2"></i> Watch Trailer
          </button>

          {/* ✍️ REVIEW FORM */}
          <div className="mt-4">
            <h4 className="mb-3">Add Review</h4>
            <textarea
              placeholder="Write review..."
              className="form-control mb-2"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <button className="btn btn-primary" onClick={submitReview}>
              {isAuthenticated ? "Submit Review" : "Login to Review"}
            </button>
          </div>
        </div>
      </div>

      <hr className="my-5" />

      {/* 📝 REVIEWS */}
      <h3 className="mb-3">Reviews</h3>

      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews.map((r, index) => (
          <div key={index} className="mb-4 p-4 rounded shadow-sm" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-default)" }}>
            <div className="d-flex align-items-center mb-3">
              <i className="bi bi-person-circle fs-3 me-3" style={{ color: "var(--accent)" }}></i>
              <div>
                <h6 className="mb-0 fw-bold fs-5" style={{ color: "var(--text-primary)", letterSpacing: "0.5px" }}>{r.user}</h6>
                {r.createdAt && (
                  <small style={{ color: "var(--text-disabled)", fontSize: "0.85rem" }}>
                    {formatDistanceToNow(new Date(r.createdAt), { addSuffix: true })}
                  </small>
                )}
              </div>
            </div>
            <p className="mb-0" style={{ color: "var(--text-secondary)", lineHeight: "1.7", fontSize: "1.05rem" }}>
              "{r.review}"
            </p>
          </div>
        ))
      )}



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

      {/* 🎬 Trailer Modal */}
      <Modal show={showTrailer} onHide={() => setShowTrailer(false)} size="lg" centered>
        <Modal.Header closeButton className="bg-dark text-white border-secondary">
          <Modal.Title>{movie?.title} - Trailer</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark p-0">
          {trailerKey ? (
            <div className="ratio ratio-16x9">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="p-4 text-center text-white">Trailer not available</div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default MovieDetails;