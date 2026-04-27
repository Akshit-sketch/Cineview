import React, { useState } from "react";
import Cards from "../components/Cards";
import ProfileSidebar from "../components/ProfileSidebar";
import ProfileHeader from "../components/ProfileHeader";
import { useMovieActions } from "../context/MovieActionsContext";
import "./Profile.css";

function Wishlist() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { wishlistMovies } = useMovieActions();

  return (
    <div className="profile-page-shell">
      <ProfileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        active="wishlist"
      />

      <main className="profile-content">
        <ProfileHeader onMenuClick={() => setSidebarOpen(true)} />

        <h1 className="profile-title">Wishlist</h1>

        {wishlistMovies.length === 0 ? (
          <div className="profile-form-card">
            <p className="profile-meta mb-0">No movies added yet</p>
          </div>
        ) : (
          <div className="movie-grid-list">
            {wishlistMovies.map((movie) => (
              <div key={movie.id}>
                <Cards {...movie} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Wishlist;
