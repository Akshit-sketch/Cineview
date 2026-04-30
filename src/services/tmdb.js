const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

export const fetchPopularMovies = async () => {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  );
  const data = await res.json();

  return data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    description: movie.overview,
    
    poster: movie.poster_path
      ? `${IMG_BASE}${movie.poster_path}`
      : "/fallback.jpg",

    image: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
      : (movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : "/fallback.jpg"),

    rating: Math.round(movie.vote_average / 2), 

    createdAt: movie.release_date, 

    year: movie.release_date?.split("-")[0] || "N/A",
  }));
};

export const searchMovies = async (query) => {
  if (!query) return [];
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  const data = await res.json();

  return data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    description: movie.overview,
    poster: movie.poster_path
      ? `${IMG_BASE}${movie.poster_path}`
      : "/fallback.jpg",
    rating: Math.round(movie.vote_average / 2),
    createdAt: movie.release_date,
    year: movie.release_date?.split("-")[0] || "N/A",
  }));
};

export const fetchMovieDetails = async (id) => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  );
  const movie = await res.json();

  return {
    id: movie.id,
    title: movie.title,
    description: movie.overview,
    poster: movie.poster_path
      ? `${IMG_BASE}${movie.poster_path}`
      : "/fallback.jpg",
    rating: Math.round(movie.vote_average / 2),
    createdAt: movie.release_date,
    year: movie.release_date?.split("-")[0] || "N/A",
    runtime: movie.runtime,
    genres: movie.genres?.map((g) => g.name).join(", "),
  };
};

export const fetchMovieTrailer = async (id) => {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`
    );
    const data = await res.json();
    if (data.results) {
      const trailer = data.results.find(
        (video) => video.site === "YouTube" && video.type === "Trailer"
      );
      if (trailer) {
        return trailer.key;
      }
      const anyVideo = data.results.find((video) => video.site === "YouTube");
      if (anyVideo) return anyVideo.key;
    }
    return null;
  } catch (err) {
    console.error("Error fetching trailer:", err);
    return null;
  }
};

export const fetchTrendingPeople = async () => {
  try {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const allResults = [];
    // Fetch 2 pages to ensure we have enough people after filtering
    for (let page = 1; page <= 2; page++) {
      const res = await fetch(
        `${BASE_URL}/person/popular?api_key=${API_KEY}&page=${page}`
      );
      const data = await res.json();
      if (data.results) {
        allResults.push(...data.results);
      }
    }

    const peopleWithRecentMovies = [];

    await Promise.all(
      allResults.map(async (person) => {
        try {
          const creditsRes = await fetch(
            `${BASE_URL}/person/${person.id}/movie_credits?api_key=${API_KEY}`
          );
          const credits = await creditsRes.json();

          const hasRecentMovie =
            credits.cast &&
            credits.cast.some((movie) => {
              if (!movie.release_date) return false;
              const releaseDate = new Date(movie.release_date);
              return releaseDate >= oneYearAgo;
            });

          if (hasRecentMovie) {
            peopleWithRecentMovies.push(person);
          }
        } catch (error) {
          console.error(`Error fetching credits for person ${person.id}:`, error);
        }
      })
    );

    // Sort by popularity again since Promise.all doesn't guarantee order
    peopleWithRecentMovies.sort((a, b) => b.popularity - a.popularity);

    return peopleWithRecentMovies.map((person) => ({
      id: person.id,
      name: person.name,

      profile: person.profile_path
        ? `${IMG_BASE}${person.profile_path}`
        : "/fallback.jpg",

      knownFor: person.known_for
        ?.map((m) => m.title || m.name) // ✅ FIXED
        .join(", ") || "N/A",
    }));
  } catch (err) {
    console.error("Error fetching people:", err);
    return [];
  }
};


export const fetchPersonDetails = async (id) => {
  try {
    const res = await fetch(
      `${BASE_URL}/person/${id}?api_key=${API_KEY}`
    );
    const data = await res.json();

    return {
      id: data.id,
      name: data.name,
      bio: data.biography,
      birthday: data.birthday,
      place: data.place_of_birth,

      profile: data.profile_path
        ? `${IMG_BASE}${data.profile_path}`
        : "/fallback.jpg",
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};


export const fetchPersonMovies = async (id) => {
  try {
    const res = await fetch(
      `${BASE_URL}/person/${id}/movie_credits?api_key=${API_KEY}`
    );
    const data = await res.json();

    return data.cast.slice(0, 10).map((movie) => ({
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path
        ? `${IMG_BASE}${movie.poster_path}`
        : "/fallback.jpg",
      rating: Math.round(movie.vote_average / 2),
      description: movie.overview,
      createdAt: movie.release_date,
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
};