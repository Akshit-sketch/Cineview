import { useParams } from "react-router-dom";
import movies from "../data/movies";
import Cards from "../components/Cards";

function MovieDetails() {

  const { id } = useParams();

  const movie = movies.find((m) => m.id === Number(id));

  if (!movie) {
    return <h2 className="text-center mt-5">Movie Not Found</h2>;
  }

  /* Suggested Movies */
  const relatedMovies = movies
    .filter((m) => m.id !== movie.id)
    .slice(0, 6);

  return (

    <div className="container mt-5 text-light">

      {/* MOVIE DETAILS */}
      <div className="row align-items-center">

        <div className="col-md-4">

          <img
            src={movie.poster}
            alt={movie.title}
            style={{
              width: "100%",
              borderRadius: "15px"
            }}
          />

        </div>

        <div className="col-md-8">

          <h1 className="mb-3">{movie.title}</h1>

          <p className="fs-5 text-warning">⭐ {movie.rating}/5</p>

          <p style={{ lineHeight: "1.8" }}>
            {movie.description}
          </p>

          <p className="text-secondary">
            <b>Release Date:</b> {movie.createdAt}
          </p>

          {/* Trailer Button */}
          <a
            href={movie.trailer}
            target="_blank"
            rel="noreferrer"
            className="btn btn-danger mt-3"
          >
            ▶ Watch Trailer
          </a>

        </div>

      </div>

      <hr className="my-5" />

      {/* REVIEWS */}
      <h3 className="mb-3">Reviews</h3>

      <p className="text-secondary">
        <b>Aman:</b> Amazing movie, visuals are incredible.
      </p>

      <p className="text-secondary">
        <b>Riya:</b> One of the best movies I've watched.
      </p>

      <p className="text-secondary">
        <b>Arjun:</b> A timeless classic with great characters.
      </p>

      <hr className="my-5" />

      {/* RECOMMENDED MOVIES */}
      <h3 className="text-light mb-4">
        You Can Also See
      </h3>

      <div className="movie-scroll">

{relatedMovies.map((m)=>(
<div className="mini-card" key={m.id}>

<img
src={m.poster}
alt={m.title}
/>

<p>{m.title}</p>

</div>
))}

</div>

    </div>

  );

}

export default MovieDetails;