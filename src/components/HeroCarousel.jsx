import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchPopularMovies } from "../services/tmdb";
import { useMovieActions } from "../context/MovieActionsContext";

function HeroCarousel() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const { isLiked, toggleLiked } = useMovieActions();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchPopularMovies();
        setMovies(data.slice(0, 10));
      } catch (err) {
        console.error(err);
      }
    };
    loadMovies();
  }, []);

  const handleWatchNow = (e, movie) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location } });
    } else {
      navigate(`/movie/${movie.id}`);
    }
  };

  const handleLike = (e, movie) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location } });
      return;
    }
    const moviePayload = {
      id: movie.id,
      title: movie.title,
      poster: movie.poster,
      rating: movie.rating,
      description: movie.description,
      createdAt: movie.createdAt,
    };
    toggleLiked(moviePayload);
  };

  if (movies.length === 0) {
    return <div style={{ height: "70vh", background: "var(--bg-card)" }}></div>;
  }

  return (
    <Carousel fade pause={false}>
      {movies.map((movie) => (
        <Carousel.Item key={movie.id}>
          <img
            className="d-block w-100 hero-img"
            src={movie.image}
            alt={movie.title}
          />
          <Carousel.Caption className="hero-caption">
            <h2>{movie.title}</h2>
            <div className="hero-buttons">
              <button
                className="btn btn-primary me-2"
                onClick={(e) => handleWatchNow(e, movie)}
              >
                Watch Now
              </button>
              <button
                className={`btn ${isLiked(movie.id) ? "btn-danger" : "btn-outline-light"}`}
                onClick={(e) => handleLike(e, movie)}
                title={isLiked(movie.id) ? "Unlike" : "Like"}
              >
                <i className={`bi ${isLiked(movie.id) ? "bi-heart-fill" : "bi-heart"}`}></i>
              </button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default HeroCarousel;