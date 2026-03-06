import React from "react";
import { useParams } from "react-router-dom";
import movies from "../data/movies";

function MovieDetails() {

  const { id } = useParams();

  const movie = movies.find((m) => m.id === Number(id));

  return (
    <div className="container mt-5">

      <h1>{movie.title}</h1>

      <img
        src={movie.image}
        alt={movie.title}
        style={{ width: "300px", borderRadius: "10px" }}
      />

      <h3 className="mt-3">Rating: ⭐ {movie.rating}</h3>

      <p className="mt-3"><b>Main Leads:</b> {movie.lead}</p>

      <p><b>Description:</b> {movie.description}</p>

      <p><b>Review:</b> {movie.review}</p>

    </div>
  );
}

export default MovieDetails;