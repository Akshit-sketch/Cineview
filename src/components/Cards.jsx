import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useMovieActions } from "../context/MovieActionsContext";
import { fetchMovieTrailer } from "../services/tmdb";

import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

function Cards({ id, title, description, rating, createdAt, poster }) {
  const { isLiked, isWishlisted, toggleLiked, toggleWishlist } = useMovieActions();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);

  const liked = isLiked(id);
  const wishlisted = isWishlisted(id);

  const moviePayload = { id, title, poster, rating, description, createdAt };

  const handlePlayTrailer = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check auth if we want to protect trailers, but trailers are usually public.
    // The user requested "add a watch now button in every page and then make it play the trailer"
    // I will let trailers be public unless it's the Watch Now in HeroCarousel which was protected earlier.
    // Wait, earlier we protected Watch Now in HeroCarousel, so let's protect this one too for consistency.
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

  // ⭐ Render stars safely
  const renderStars = () => {
    const stars = [];
    const safeRating = Math.round(Number(rating)) || 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= safeRating) {
        stars.push(
          <i key={i} className="bi bi-star-fill" style={{ color: "var(--accent)" }}></i>
        );
      } else {
        stars.push(
          <i key={i} className="bi bi-star" style={{ color: "var(--accent)" }}></i>
        );
      }
    }

    return stars;
  };

  return (
    <Card className="movie-card shadow movie-card-wrapper h-100" style={{ width: "250px" }}>
      
      {/* ❤️ Action Buttons */}
      <div className="movie-action-buttons">
        <button
          type="button"
          className="movie-action-btn"
          onClick={handlePlayTrailer}
          aria-label="Play Trailer"
        >
          <i className="bi bi-play-fill" style={{ fontSize: "1.2rem" }} />
        </button>

        <button
          type="button"
          className={`movie-action-btn ${liked ? "active-like" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            if (!isAuthenticated) {
              navigate("/login", { state: { from: location } });
            } else {
              toggleLiked(moviePayload);
            }
          }}
          aria-label="Toggle like"
        >
          <i className={`bi ${liked ? "bi-heart-fill" : "bi-heart"}`} />
        </button>

        <button
          type="button"
          className={`movie-action-btn ${wishlisted ? "active-wishlist" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            if (!isAuthenticated) {
              navigate("/login", { state: { from: location } });
            } else {
              toggleWishlist(moviePayload);
            }
          }}
          aria-label="Toggle wishlist"
        >
          <i className={`bi ${wishlisted ? "bi-bookmark-fill" : "bi-bookmark"}`} />
        </button>
      </div>

      {/* 🎬 Movie Link */}
      <Link to={`/movie/${id}`} style={{ textDecoration: "none", display: "flex", flexDirection: "column", height: "100%" }}>
        
        {/* 🖼 Poster */}
        <Card.Img
          variant="top"
          src={poster || "/fallback.jpg"} // ✅ fallback added
          style={{ height: "330px", objectFit: "cover" }}
        />

        <Card.Body
          className="d-flex flex-column"
          style={{
            background: "var(--bg-card)",
            color: "var(--text-tertiary)",
            borderTop: "1px solid var(--border-default)",
            flexGrow: 1
          }}
        >
          {/* 🎯 Title */}
          <Card.Title>{title}</Card.Title>

          {/* ⭐ Rating */}
          <div>
            {renderStars()} {rating || "0"}/5
          </div>

          {/* 📝 Description */}
          <Card.Text style={{ color: "var(--text-muted-2)" }}>
            {description
              ? description.split(" ").slice(0, 8).join(" ")
              : "No description available"}
          </Card.Text>

          {/* 📅 Date (SAFE FIX) */}
          <footer className="blockquote-footer mt-auto">
            {createdAt
              ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
              : "Release date unknown"}
          </footer>

        </Card.Body>
      </Link>

      {/* 🎬 Trailer Modal */}
      <Modal show={showTrailer} onHide={() => setShowTrailer(false)} size="lg" centered>
        <Modal.Header closeButton className="bg-dark text-white border-secondary">
          <Modal.Title>{title} - Trailer</Modal.Title>
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
    </Card>
  );
}

export default Cards;