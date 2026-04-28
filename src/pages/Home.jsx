import React, { useState, useEffect } from "react";

import Cards from "../components/Cards";
import HeroCarousel from "../components/HeroCarousel";
import GenreFilter from "../components/GenreFilter";
import PopularPeople from "../components/PopularPeople";
import { fetchPopularMovies } from "../services/tmdb";

function Home({ search }) {
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [movies, setMovies] = useState([]);

  // ✅ Fetch from TMDB
  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchPopularMovies();
      setMovies(data);
    };

    loadMovies();
  }, []);

  // 🔍 Search filter
  const searchFilteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  // 🎭 Genre filter (temporary - TMDB genres need mapping later)
  const genreFilteredMovies =
    selectedGenre === "all"
      ? searchFilteredMovies
      : searchFilteredMovies;

  // 🎬 Since TMDB doesn't give category like "top/classic/kids"
  const topMovies = genreFilteredMovies.slice(0, 10);
  const classicMovies = genreFilteredMovies.slice(10, 20);
  const kidsMovies = genreFilteredMovies.slice(20, 30);

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

        <h2 className="section-title">🎬 More Popular Movies</h2>
        <div className="movie-scroll">
          {classicMovies.map((movie) => (
            <div className="movie-item" key={movie.id}>
              <Cards {...movie} />
            </div>
          ))}
        </div>

        <h2 className="section-title">🍿 Explore More</h2>
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