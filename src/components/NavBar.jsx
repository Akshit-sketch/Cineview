import React, { useEffect, useMemo, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMovieActions } from "../context/MovieActionsContext";
import { searchMovies } from "../services/tmdb";
function NavBar({ search, setSearch }) {
  const { user, isAuthenticated, logout } = useAuth();
  const { likedMovies, wishlistMovies } = useMovieActions();
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!searchRef.current?.contains(event.target)) {
        setIsSearchFocused(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, []);

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    let active = true;
    if (!debouncedSearch) {
      setSearchResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        const results = await searchMovies(debouncedSearch);
        if (active) {
          setSearchResults(results.slice(0, 8));
        }
      } catch (err) {
        console.error("Error searching movies in NavBar:", err);
      }
    };

    fetchResults();
    return () => {
      active = false;
    };
  }, [debouncedSearch]);

  const exactMatch = useMemo(() => {
    const query = debouncedSearch.toLowerCase();
    return searchResults.find((movie) => movie.title.toLowerCase() === query);
  }, [debouncedSearch, searchResults]);

  const shouldShowDropdown = isSearchFocused && search.trim().length > 0;

  const openMovie = (movie) => {
    if (!movie) return;
    navigate(`/movie/${movie.id}`);
    setIsSearchFocused(false);
    setSelectedIndex(-1);
  };

  const handleSearchKeyDown = (e) => {
    if (!shouldShowDropdown) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (searchResults.length === 0) return;
      setSelectedIndex((prev) => (prev + 1) % searchResults.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (searchResults.length === 0) return;
      setSelectedIndex((prev) => (prev <= 0 ? searchResults.length - 1 : prev - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (searchResults.length === 0) return;
      const selectedMovie =
        exactMatch || searchResults[selectedIndex >= 0 ? selectedIndex : 0];
      openMovie(selectedMovie);
    } else if (e.key === "Escape") {
      setIsSearchFocused(false);
      setSelectedIndex(-1);
    }
  };

  const renderHighlightedText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={`${part}-${index}`} className="search-highlight">
          {part}
        </mark>
      ) : (
        <span key={`${part}-${index}`}>{part}</span>
      )
    );
  };

  const handleLoginClick = () => {
    navigate("/login", { state: { from: location } });
  };

  const handleSignupClick = () => {
    navigate("/signup", { state: { from: location } });
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow">
      <Container fluid className="px-3">

        <div className="d-flex align-items-center gap-3 flex-grow-1">
          {/* Logo + Brand */}
          <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center gap-2 m-0">
            <img
              src="/starred-ticket.png"
              alt="CineView"
              width="28"
              height="28"
              style={{ display: "block" }}
            />
            <span>CineView</span>
          </Navbar.Brand>

          {/* Search Bar (left side, next to logo) */}
          <Form
            className="d-flex flex-grow-1 position-relative"
            style={{ maxWidth: "520px" }}
            ref={searchRef}
          >
            <Form.Control
              type="search"
              placeholder="Search for a movie..."
              className="search-bar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onKeyDown={handleSearchKeyDown}
            />
            {shouldShowDropdown && (
              <div className="search-dropdown">
                {searchResults.length === 0 ? (
                  <div className="search-empty">No movies found</div>
                ) : (
                  searchResults.map((movie, index) => (
                    <button
                      key={movie.id}
                      type="button"
                      className={`search-result-item ${
                        index === selectedIndex ? "active" : ""
                      }`}
                      onMouseDown={() => openMovie(movie)}
                    >
                      <img src={movie.poster} alt={movie.title} className="search-result-poster" />
                      <div className="search-result-content">
                        <div className="search-result-title">
                          {renderHighlightedText(movie.title, debouncedSearch)}
                        </div>
                        <div className="search-result-meta">
                          {String(movie.createdAt || "").slice(0, 4) || "N/A"} • {movie.rating}/5
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </Form>
        </div>

        <Navbar.Toggle aria-controls="navbar" />

        <Navbar.Collapse id="navbar">
          <Nav className="ms-auto align-items-center">

            <Nav.Link as={Link} to="/top">
              Top Rated
            </Nav.Link>

            <Nav.Link as={Link} to="/liked">
              Liked
              {likedMovies.length > 0 && (
                <span className="badge bg-danger ms-2">{likedMovies.length}</span>
              )}
            </Nav.Link>

            <Nav.Link as={Link} to="/wishlist">
              Wishlist
              {wishlistMovies.length > 0 && (
                <span className="badge bg-info text-dark ms-2">{wishlistMovies.length}</span>
              )}
            </Nav.Link>

            {!isAuthenticated && (
              <>
                <Nav.Link onClick={handleLoginClick}>
                  Login
                </Nav.Link>
                <Nav.Link onClick={handleSignupClick}>
                  Signup
                </Nav.Link>
              </>
            )}

            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/profile" className="text-light ms-3">
                  <i className="bi bi-person-circle me-1" />
                  {user?.name || user?.email}
                </Nav.Link>
                <button
                  className="btn btn-outline-light btn-sm ms-3"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            )}

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default NavBar;