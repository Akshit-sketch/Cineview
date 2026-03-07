import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

function Cards({ id, title, description, rating, createdAt, poster }) {

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
      } else {
        stars.push(<i key={i} className="bi bi-star text-warning"></i>);
      }
    }

    return stars;
  };

  return (

    <Link to={`/movie/${id}`} style={{ textDecoration: "none" }}>

      <Card className="movie-card shadow" style= {{width:"250px"}}>

        <Card.Img
          variant="top"
          src={poster}
          style={{ height: "330px", objectFit: "cover" }}
        />

        <Card.Body
          style={{
            background: "rgba(15,23,42,0.95)",
            color: "#e2e8f0"
          }}
        >

          <Card.Title>{title}</Card.Title>

          <div>
            {renderStars()} {rating}/5
          </div>

          <Card.Text style = {{ color:"#cbd5f5"}}>{description.split(" ").slice(0,8).join(" ")}</Card.Text>

          <footer className="blockquote-footer">
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </footer>

        </Card.Body>

      </Card>

    </Link>
  );
}

export default Cards;