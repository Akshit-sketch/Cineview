import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTrendingPeople } from "../services/tmdb";

function PopularPeople() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const loadPeople = async () => {
      try {
        const data = await fetchTrendingPeople();
        setPeople(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadPeople();
  }, []);

  if (!people.length) {
    return <h2 style={{ color: "white" }}>Loading personalities...</h2>;
  }

  return (
    <div className="container mt-5">
      <h2 className="section-title">⭐ Trending Personalities</h2>

      <div className="d-flex flex-wrap gap-4 justify-content-center">
        {people.map((person) => (
          <Link
            key={person.id}
            to={`/person/${person.id}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <div style={{ textAlign: "center" }}>
              
              <img
                src={person.profile}
                alt={person.name}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #00f5d4",
                }}
              />

              <p style={{ marginTop: "8px" }}>{person.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularPeople;