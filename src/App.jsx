import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import "./App.css";

import NavBar from "./components/NavBar";

import Home from "./pages/Home";
import AddPage from "./pages/AddPage";
import MovieDetails from "./pages/MovieDetails";
import TopRated from "./pages/TopRated";
import About from "./pages/About";
import Footer from "./components/Footer";

function App() {

  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>

      {/* Navbar with search */}
      <NavBar search={search} setSearch={setSearch} />

      <Routes>

        <Route
          path="/"
          element={<Home search={search} />}
        />

        <Route path="/add" element={<AddPage />} />

        <Route path="/movie/:id" element={<MovieDetails />} />

        <Route path="/top" element={<TopRated />} />

        <Route path="/about" element={<About />} />

      </Routes>
      <Footer />

    </BrowserRouter>
  );
}

export default App;