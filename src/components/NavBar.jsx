import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar({ search, setSearch }) {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddReviewClick = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location } });
    } else {
      navigate("/add");
    }
  };

  const handleLoginClick = () => {
    navigate("/login", { state: { from: location } });
  };

  const handleSignupClick = () => {
    navigate("/signup", { state: { from: location } });
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow">
      <Container>

        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          🎬 CineView
        </Navbar.Brand>

        {/* Search Bar */}
        <Form className="d-flex mx-auto">
          <Form.Control
            type="search"
            placeholder="Search for a movie..."
            className="me-2 search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form>

        <Navbar.Toggle aria-controls="navbar" />

        <Navbar.Collapse id="navbar">
          <Nav className="ms-auto align-items-center">

            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/top">
              Top Rated
            </Nav.Link>

            <Nav.Link href="/add" onClick={handleAddReviewClick}>
              Add Review
            </Nav.Link>

            <Nav.Link as={Link} to="/about">
              About
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
                <span className="text-light ms-3">
                  <i className="bi bi-person-circle me-1" />
                  {user?.name || user?.email}
                </span>
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