import React from "react";

const genres = ["drama", "action", "animation", "comedy", "horror", "all"];

function GenreFilter({ selectedGenre, setSelectedGenre }) {
  return (
    <div className="genre-container container">

      <h3 className="genre-title">Movies</h3>

      <div className="genre-buttons">

        {genres.map((genre) => (
          <button
            key={genre}
            className={
              selectedGenre === genre
                ? "genre-btn active"
                : "genre-btn"
            }
            onClick={() => setSelectedGenre(genre)}
          >
            {genre.toUpperCase()}
          </button>
        ))}

      </div>

      <hr />

    </div>
  );
}

export default GenreFilter;