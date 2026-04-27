import React, { useState } from "react";
import movies from "../data/movies";
import Cards from "../components/Cards";
import ProfileSidebar from "../components/ProfileSidebar";
import ProfileHeader from "../components/ProfileHeader";
import "./Profile.css";

function TopRated() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const topMovies = movies.filter(movie => movie.rating >= 4);

  return (
    <div className="profile-page-shell">
      <ProfileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        active="top-rated"
      />
      <main className="profile-content">
        <ProfileHeader onMenuClick={() => setSidebarOpen(true)} />
        <h1 className="profile-title">Top Rated Movies</h1>

        <div className="movie-grid-list">
          {topMovies.map((movie) => (
            <div key={movie.id}>
              <Cards {...movie} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default TopRated;