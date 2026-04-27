import React from "react";
import { Link } from "react-router-dom";
import { useMovieActions } from "../context/MovieActionsContext";

function ProfileSidebar({ isOpen, onClose, active = "profile" }) {
  const { likedMovies, wishlistMovies } = useMovieActions();
  return (
    <aside className={`profile-sidebar ${isOpen ? "open" : ""}`}>
      <div className="d-flex justify-content-between align-items-center mb-4 profile-sidebar-top">
        <Link to="/" className="profile-logo d-flex align-items-center gap-2">
          <img src="/starred-ticket.png" alt="CineView" width="30" height="30" />
          <span>CineView</span>
        </Link>
        <button
          type="button"
          className="btn btn-link text-light d-md-none p-0"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <i className="bi bi-x-lg" />
        </button>
      </div>

      <nav className="d-flex flex-column gap-2">
        <Link
          to="/top"
          className={`profile-menu-item ${active === "top-rated" ? "active" : ""}`}
          onClick={onClose}
        >
          <i className="bi bi-star me-2" />
          Top Rated
        </Link>
        <Link
          to="/about"
          className={`profile-menu-item ${active === "about" ? "active" : ""}`}
          onClick={onClose}
        >
          <i className="bi bi-info-circle me-2" />
          About
        </Link>
        <Link
          to="/liked"
          className={`profile-menu-item ${active === "liked" ? "active" : ""}`}
          onClick={onClose}
        >
          <i className="bi bi-heart me-2" />
          Liked
          <span className="profile-badge ms-auto">{likedMovies.length}</span>
        </Link>
        <Link
          to="/wishlist"
          className={`profile-menu-item ${active === "wishlist" ? "active" : ""}`}
          onClick={onClose}
        >
          <i className="bi bi-bookmark me-2" />
          Wishlist
          <span className="profile-badge ms-auto">{wishlistMovies.length}</span>
        </Link>
        <Link
          to="/profile"
          className={`profile-menu-item ${active === "profile" ? "active" : ""}`}
          onClick={onClose}
        >
          <i className="bi bi-person me-2" />
          Profile
        </Link>
      </nav>
    </aside>
  );
}

export default ProfileSidebar;
