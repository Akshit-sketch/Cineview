import React, { useState } from "react";

import Cards from "../components/Cards";
import movies from "../data/movies";

import HeroCarousel from "../components/HeroCarousel";
import GenreFilter from "../components/GenreFilter";
import PopularPeople from "../components/PopularPeople";

function Home({ search }) {

  const [selectedGenre, setSelectedGenre] = useState("all");

  const searchFilteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  const genreFilteredMovies =
    selectedGenre === "all"
      ? searchFilteredMovies
      : searchFilteredMovies.filter((m) => m.genre === selectedGenre);

  const topMovies = genreFilteredMovies.filter((m) => m.category === "top");
  const classicMovies = genreFilteredMovies.filter((m) => m.category === "classic");
  const kidsMovies = genreFilteredMovies.filter((m) => m.category === "kids");

  return (
    <>

      <HeroCarousel />

      <GenreFilter
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />

      <div className="container mt-4">

        <h2 className="section-title">🔥 Top Movies Right Now</h2>

        <div className="movie-scroll">
          {topMovies.map((movie) => (
            <div className="movie-item" key={movie.id}>
              <Cards {...movie} />
            </div>
          ))}
        </div>


        <h2 className="section-title">🎬 Classic Blockbusters</h2>

        <div className="movie-scroll">
          {classicMovies.map((movie) => (
            <div className="movie-item" key={movie.id}>
              <Cards {...movie} />
            </div>
          ))}
        </div>


        <h2 className="section-title">🧸 Kids Movies</h2>

        <div className="movie-scroll">
          {kidsMovies.map((movie) => (
            <div className="movie-item" key={movie.id}>
              <Cards {...movie} />
            </div>
          ))}
        </div>

      </div>

      <PopularPeople />

    </>
  );
}

export default Home;