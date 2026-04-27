import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import "./App.css";

import NavBar from "./components/NavBar";

import Home from "./pages/Home";
import AddPage from "./pages/AddPage";
import MovieDetails from "./pages/MovieDetails";
import TopRated from "./pages/TopRated";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Liked from "./pages/Liked";
import Wishlist from "./pages/Wishlist";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RequireAuth from "./components/RequireAuth";
import { AuthProvider } from "./context/AuthContext";
import { MovieActionsProvider } from "./context/MovieActionsContext";

function App() {

  const [search, setSearch] = useState("");

  return (
    <AuthProvider>
      <MovieActionsProvider>
        <BrowserRouter>

        {/* Navbar with search */}
        <NavBar search={search} setSearch={setSearch} />

        <Routes>

          <Route
            path="/"
            element={<Home search={search} />}
          />

          <Route
            path="/add"
            element={
              <RequireAuth>
                <AddPage />
              </RequireAuth>
            }
          />

          <Route path="/movie/:id" element={<MovieDetails />} />

          <Route path="/top" element={<TopRated />} />

          <Route path="/about" element={<About />} />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route path="/liked" element={<Liked />} />
          <Route path="/wishlist" element={<Wishlist />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

        </Routes>
        <Footer />

        </BrowserRouter>
      </MovieActionsProvider>
    </AuthProvider>
  );
}

export default App;