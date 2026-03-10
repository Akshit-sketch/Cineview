import React from "react";
import movies from "../data/movies";
import Cards from "../components/Cards";

function TopRated() {

  const topMovies = movies.filter(movie => movie.rating >= 4);

  return (
    <div className="container mt-4">
      <h2 className="mb-4" style={{color:"#cbd5f5"}}>⭐ Top Rated Movies</h2>

      <div className="row">
        {topMovies.map(movie => (
          <div className="col-md-4" key={movie.id}>
            <Cards {...movie} />
          </div>
        ))}
      </div>

    </div>
  );
}

export default TopRated;