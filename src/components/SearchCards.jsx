import React from "react";

function SearchCards({ setMovie, movie }) {
  return (
    <input
      type="text"
      placeholder="Search"
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-input)",
        borderRadius: "7px",
        color: "var(--text-tertiary)",
      }}
      onChange={(e) => setMovie(e.target.value)}
      value={movie}
    />
  );
}

export default SearchCards;
