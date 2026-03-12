import React from "react";

function About() {
  return (
    <div className="container mt-5">

      <div className="d-flex align-items-center gap-3 mb-3">
        <img
          src="/starred-ticket.png"
          alt="CineView logo"
          width="56"
          height="56"
          style={{ borderRadius: "12px" }}
        />
        <h1 style={{ color: "#cbd5f5", margin: 0 }}>About CineView</h1>
      </div>

      <p className="mt-3" style={{ color: "#cbd5f5", maxWidth: "720px" }}>
        CineView is a movie companion built for people who love discovering,
        discussing and tracking films. You can search across our curated list
        of titles, open a movie page to see the synopsis and rating, and then
        share your own thoughts through reviews.
      </p>

      <h4 className="mt-4" style={{ color: "#cbd5f5" }}>How to use CineView</h4>
      <ul style={{ color: "#cbd5f5", maxWidth: "720px" }}>
        <li className="mt-2">
          <strong>Browse & search</strong> – Use the search bar in the top
          navigation to quickly find a movie by title, or scroll through the
          Top, Classic and Kids sections on the home page.
        </li>
        <li className="mt-2">
          <strong>Open movie details</strong> – Click any movie card to see
          a detailed page with description, rating and a link to the trailer.
        </li>
        <li className="mt-2">
          <strong>Create an account</strong> – Sign up from the top-right corner
          to save your profile and unlock reviewing.
        </li>
        <li className="mt-2">
          <strong>Write reviews</strong> – Once logged in, scroll to the reviews
          section on a movie page, add your review text and submit. Your review
          is then stored in our backend and shown to other visitors.
        </li>
        <li className="mt-2">
          <strong>Add your own movies</strong> – Use the “Add Review” page to
          create a new movie review entry with a title, description and rating.
        </li>
      </ul>

      <p className="mt-4" style={{ color: "#9ca3af" }}>
        CineView is built with React, React Router, Bootstrap and a lightweight
        Node/Express backend that stores reviews and user accounts.
      </p>

    </div>
  );
}

export default About;