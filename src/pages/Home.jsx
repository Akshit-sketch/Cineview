import React from "react";
import Cards from "../components/Cards";
import movies from "../data/movies";
import HeroCarousel from "../components/HeroCarousel";
import PopularPeople from "../components/PopularPeople";

function Home({ search }) {

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  const topMovies = filteredMovies.filter((m) => m.category === "top");
  const classicMovies = filteredMovies.filter((m) => m.category === "classic");
  const kidsMovies = filteredMovies.filter((m) => m.category === "kids");

  return (
    <>

      {/* Hero banner */}
      <HeroCarousel />

      <div className="container mt-4">

        {/* Top Movies */}
        <h2 className="section-title">🔥 Top Movies Right Now</h2>

        <div className="movie-scroll">
          {topMovies.map((movie) => (
            <div className="movie-item" key={movie.id}>
              <Cards {...movie} />
            </div>
          ))}
        </div>


        {/* Classic Movies */}
        <h2 className="section-title">🎬 Classic Blockbusters</h2>

        <div className="movie-scroll">
          {classicMovies.map((movie) => (
            <div className="movie-item" key={movie.id}>
              <Cards {...movie} />
            </div>
          ))}
        </div>


        {/* Kids Movies */}
        <h2 className="section-title">🧸 Kids Movies</h2>

        <div className="movie-scroll">
          {kidsMovies.map((movie) => (
            <div className="movie-item" key={movie.id}>
              <Cards {...movie} />
            </div>
          ))}
        </div>
        <PopularPeople />

      </div>

    </>
  );
}

export default Home;