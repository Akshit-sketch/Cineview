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

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<i key={i} className="bi bi-star-fill" style={{ color: "var(--accent)" }}></i>);
      } else {
        stars.push(<i key={i} className="bi bi-star" style={{ color: "var(--accent)" }}></i>);
      }
    }

    return stars;
  };

  return (
    <Card className="movie-card shadow movie-card-wrapper" style={{ width: "250px" }}>
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

      <Link to={`/movie/${id}`} style={{ textDecoration: "none" }}>

        <Card.Img
          variant="top"
          src={poster}
          style={{ height: "330px", objectFit: "cover" }}
        />

        <Card.Body
          style={{
            background: "var(--bg-card)",
            color: "var(--text-tertiary)",
            borderTop: "1px solid var(--border-default)",
          }}
        >

          <Card.Title>{title}</Card.Title>

          <div>
            {renderStars()} {rating}/5
          </div>

          <Card.Text style = {{ color: "var(--text-muted-2)" }}>{description.split(" ").slice(0,8).join(" ")}</Card.Text>

          <footer className="blockquote-footer">
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </footer>

        </Card.Body>
      </Link>
    </Card>
  );
}

export default Cards;