import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useMovieActions } from "../context/MovieActionsContext";

function Cards({ id, title, description, rating, createdAt, poster }) {
  const { isLiked, isWishlisted, toggleLiked, toggleWishlist } = useMovieActions();

  const liked = isLiked(id);
  const wishlisted = isWishlisted(id);

  const moviePayload = { id, title, poster, rating, description, createdAt };

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
    <Card className="movie-card shadow movie-card-wrapper" style={{ width: "250px" }}>
      
      {/* ❤️ Action Buttons */}
      <div className="movie-action-buttons">
        <button
          type="button"
          className={`movie-action-btn ${liked ? "active-like" : ""}`}
          onClick={() => toggleLiked(moviePayload)}
          aria-label="Toggle like"
        >
          <i className={`bi ${liked ? "bi-heart-fill" : "bi-heart"}`} />
        </button>

        <button
          type="button"
          className={`movie-action-btn ${wishlisted ? "active-wishlist" : ""}`}
          onClick={() => toggleWishlist(moviePayload)}
          aria-label="Toggle wishlist"
        >
          <i className={`bi ${wishlisted ? "bi-bookmark-fill" : "bi-bookmark"}`} />
        </button>
      </div>

      {/* 🎬 Movie Link */}
      <Link to={`/movie/${id}`} style={{ textDecoration: "none" }}>
        
        {/* 🖼 Poster */}
        <Card.Img
          variant="top"
          src={poster || "/fallback.jpg"} // ✅ fallback added
          style={{ height: "330px", objectFit: "cover" }}
        />

        <Card.Body
          style={{
            background: "var(--bg-card)",
            color: "var(--text-tertiary)",
            borderTop: "1px solid var(--border-default)",
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
          <footer className="blockquote-footer">
            {createdAt
              ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
              : "Release date unknown"}
          </footer>

        </Card.Body>
      </Link>
    </Card>
  );
}

export default Cards;