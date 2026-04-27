import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const MovieActionsContext = createContext(null);

const BACKEND_BASE_URL = "http://localhost:3000";
const LIKED_KEY = "cineview_liked_movies";
const WISHLIST_KEY = "cineview_wishlist_movies";

function readLocalArray(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

function writeLocalArray(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function mergeUniqueById(list) {
  const map = new Map();
  list.forEach((item) => {
    map.set(String(item.id), item);
  });
  return Array.from(map.values());
}

async function fetchCollection(endpoint) {
  const res = await fetch(`${BACKEND_BASE_URL}/${endpoint}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

async function postCollection(endpoint, movie, action = "toggle") {
  const res = await fetch(`${BACKEND_BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ movie, action }),
  });
  if (!res.ok) throw new Error("Failed to update");
  return res.json();
}

export function MovieActionsProvider({ children }) {
  const [likedMovies, setLikedMovies] = useState([]);
  const [wishlistMovies, setWishlistMovies] = useState([]);

  useEffect(() => {
    const localLiked = readLocalArray(LIKED_KEY);
    const localWishlist = readLocalArray(WISHLIST_KEY);
    setLikedMovies(localLiked);
    setWishlistMovies(localWishlist);

    const loadFromBackend = async () => {
      try {
        const [liked, wishlist] = await Promise.all([
          fetchCollection("liked"),
          fetchCollection("wishlist"),
        ]);

        const mergedLiked = mergeUniqueById([...(liked || []), ...localLiked]);
        const mergedWishlist = mergeUniqueById([...(wishlist || []), ...localWishlist]);

        setLikedMovies(mergedLiked);
        setWishlistMovies(mergedWishlist);
        writeLocalArray(LIKED_KEY, mergedLiked);
        writeLocalArray(WISHLIST_KEY, mergedWishlist);
      } catch {
        // Keep localStorage data as fallback when backend is unavailable.
      }
    };

    loadFromBackend();
  }, []);

  const isLiked = (movieId) =>
    likedMovies.some((movie) => String(movie.id) === String(movieId));

  const isWishlisted = (movieId) =>
    wishlistMovies.some((movie) => String(movie.id) === String(movieId));

  const toggleLiked = async (movie) => {
    const exists = isLiked(movie.id);
    const nextLiked = exists
      ? likedMovies.filter((m) => String(m.id) !== String(movie.id))
      : mergeUniqueById([...likedMovies, movie]);
    setLikedMovies(nextLiked);
    writeLocalArray(LIKED_KEY, nextLiked);

    try {
      const serverList = await postCollection("liked", movie, "toggle");
      setLikedMovies(serverList);
      writeLocalArray(LIKED_KEY, serverList);
    } catch {
      // local fallback remains active
    }
  };

  const toggleWishlist = async (movie) => {
    const exists = isWishlisted(movie.id);
    const nextWishlist = exists
      ? wishlistMovies.filter((m) => String(m.id) !== String(movie.id))
      : mergeUniqueById([...wishlistMovies, movie]);
    setWishlistMovies(nextWishlist);
    writeLocalArray(WISHLIST_KEY, nextWishlist);

    try {
      const serverList = await postCollection("wishlist", movie, "toggle");
      setWishlistMovies(serverList);
      writeLocalArray(WISHLIST_KEY, serverList);
    } catch {
      // local fallback remains active
    }
  };

  const value = useMemo(
    () => ({
      likedMovies,
      wishlistMovies,
      isLiked,
      isWishlisted,
      toggleLiked,
      toggleWishlist,
    }),
    [likedMovies, wishlistMovies]
  );

  return (
    <MovieActionsContext.Provider value={value}>
      {children}
    </MovieActionsContext.Provider>
  );
}

export function useMovieActions() {
  return useContext(MovieActionsContext);
}
