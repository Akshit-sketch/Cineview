import React from "react";
import Card from "react-bootstrap/Card";
import { formatDistanceToNow } from "date-fns";

function Cards({ title, description, rating, createdAt, poster }) {

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <i key={i} className="bi bi-star-fill text-warning"></i>
        );
      } else {
        stars.push(
          <i key={i} className="bi bi-star text-warning"></i>
        );
      }
    }

    return stars;
  };

  return (
    <Card
      className="movie-card shadow"
      style={{
        width: "250px",
        borderRadius: "15px",
        overflow: "hidden",
        transition: "transform 0.3s ease",
      }}
    >
      
      {/* Movie Poster */}
      <Card.Img
        variant="top"
        src={poster}
        style={{
          height: "330px",
          objectFit: "cover",
        }}
      />

      <Card.Body style={{ background: "rgba(15,23,42,0.95",color: "#e2e8f0" }}>
        <Card.Title className="fw-bold">{title}</Card.Title>

        {/* Rating */}
        <div className="mb-2">
          {renderStars()}
          <span className="ms-2 fw-bold">{rating}/5</span>
        </div>

        {/* Description */}
        <Card.Text style={{ fontSize: "14px",color:"#cbd5f5" }}>
          {description}
        </Card.Text>

        {/* Time */}
        <footer className="blockquote-footer" style={{color:"#94a3b8"}}>
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </footer>
      </Card.Body>

    </Card>
  );
}

export default Cards;