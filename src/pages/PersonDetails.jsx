import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchPersonDetails,
  fetchPersonMovies,
} from "../services/tmdb";
import Cards from "../components/Cards";

function PersonDetails() {
  const { id } = useParams();

  const [person, setPerson] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const p = await fetchPersonDetails(id);
      const m = await fetchPersonMovies(id);

      setPerson(p);
      setMovies(m);
    };

    loadData();
  }, [id]);

  if (!person) {
    return <h1 style={{ color: "white" }}>Loading...</h1>;
  }

  return (
    <div className="container mt-5" style={{ color: "white" }}>
      
      {/* 👤 PERSON INFO */}
      <div className="row align-items-center">
        
        <div className="col-md-4">
          <img
            src={person.profile}
            alt={person.name}
            style={{
              width: "100%",
              borderRadius: "15px",
            }}
          />
        </div>

        <div className="col-md-8">
          <h1>{person.name}</h1>

          <p><b>🎂 Birthday:</b> {person.birthday || "N/A"}</p>
          <p><b>🌍 Place:</b> {person.place || "N/A"}</p>

          <p style={{ marginTop: "15px", lineHeight: "1.7" }}>
            {person.bio || "No biography available."}
          </p>
        </div>
      </div>

      <hr className="my-5" />

      {/* 🎬 MOVIES */}
      <h3 className="mb-4">🎬 Known For</h3>

      <div className="movie-scroll">
        {movies.map((movie) => (
          <div className="movie-item" key={movie.id}>
            <Cards {...movie} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PersonDetails;