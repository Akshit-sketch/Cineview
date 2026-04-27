import React from "react";
import { Link } from "react-router-dom";

function ProfileHeader({ onMenuClick }) {
  return (
    <div className="profile-topbar">
      <button
        type="button"
        className="btn btn-link text-light d-md-none p-0"
        onClick={onMenuClick}
        aria-label="Open sidebar"
      >
        <i className="bi bi-list fs-4" />
      </button>

      <Link to="/profile" className="profile-avatar-link ms-auto">
        <i className="bi bi-person-circle" />
      </Link>
    </div>
  );
}

export default ProfileHeader;
