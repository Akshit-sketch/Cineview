import React, { useState } from "react";
import ProfileSidebar from "../components/ProfileSidebar";
import ProfileHeader from "../components/ProfileHeader";
import "./Profile.css";

function About() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="profile-page-shell">
      <ProfileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        active="about"
      />
      <main className="profile-content">
        <ProfileHeader onMenuClick={() => setSidebarOpen(true)} />

        <div className="profile-form-card">
          <div className="d-flex align-items-center gap-3 mb-3">
            <img
              src="/starred-ticket.png"
              alt="CineView logo"
              width="56"
              height="56"
              style={{ borderRadius: "12px" }}
            />
            <h1 style={{ color: "var(--text-primary)", margin: 0 }}>About CineView</h1>
          </div>

          <p className="mt-3" style={{ color: "var(--text-tertiary)", maxWidth: "720px" }}>
            CineView is a movie companion built for people who love discovering,
            discussing and tracking films. You can search across our curated list
            of titles, open a movie page to see the synopsis and rating, and then
            share your own thoughts through reviews.
          </p>

          <h4 className="mt-4" style={{ color: "var(--text-primary)" }}>How to use CineView</h4>
          <ul style={{ color: "var(--text-tertiary)", maxWidth: "720px" }}>
            <li className="mt-2">
              <strong>Browse & search</strong> - Use the search bar in the top
              navigation to quickly find a movie by title, or scroll through the
              Top, Classic and Kids sections on the home page.
            </li>
            <li className="mt-2">
              <strong>Open movie details</strong> - Click any movie card to see
              a detailed page with description, rating and a link to the trailer.
            </li>
            <li className="mt-2">
              <strong>Create an account</strong> - Sign up from the top-right corner
              to save your profile and unlock reviewing.
            </li>
            <li className="mt-2">
              <strong>Write reviews</strong> - Once logged in, scroll to the reviews
              section on a movie page, add your review text and submit. Your review
              is then stored in our backend and shown to other visitors.
            </li>
            <li className="mt-2">
              <strong>Add your own movies</strong> - Use the "Add Review" page to
              create a new movie review entry with a title, description and rating.
            </li>
          </ul>

          <p className="mt-4 mb-0" style={{ color: "var(--text-disabled)" }}>
            CineView is built with React, React Router, Bootstrap and a lightweight
            Node/Express backend that stores reviews and user accounts.
          </p>
        </div>
      </main>
    </div>
  );
}

export default About;