import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

function NavBar({ search, setSearch }) {
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
          <Nav className="ms-auto">

            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/top">
              Top Rated
            </Nav.Link>

            <Nav.Link as={Link} to="/add">
              Add Review
            </Nav.Link>

            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default NavBar;