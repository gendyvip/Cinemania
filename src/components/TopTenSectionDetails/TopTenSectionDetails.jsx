import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SharedCard from "../../shared/SharedCard";
import { getAllMovies } from "../../API/movieAPI";
import "./TopTenSectionDetails.css";
import Spinner from "../Spinner/Spinner";

export default function TopTenSectionDetails() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopTenMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getAllMovies();
        const topTenMovies = response.data.filter(movie => movie.category === "topTen");
        setMovies(topTenMovies);
      } catch (err) {
        console.error("Error fetching top 10 movies:", err);
        setError("Failed to load top 10 movies. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopTenMovies();
  }, []);

  if (isLoading) {
    return (
      <Container className="py-5 mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <Spinner load="Loading Top 10 Movies..." />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5 mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <div className="text-center">
          <div className="alert alert-danger d-inline-block">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </div>
          <button 
            className="btn btn-warning mt-3"
            onClick={() => window.location.reload()}
          >
            <i className="bi bi-arrow-clockwise me-2"></i>Try Again
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5 mt-5">
      <div className="mb-4">
        <h1 className="text-light">Top 10 on cinemania this week</h1>
        <p style={{ color: "var(--cinemania-extended-gray)" }}>
          Most popular movies and TV shows this week
        </p>
      </div>

      {movies.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-emoji-frown text-warning" style={{ fontSize: "2rem" }}></i>
          <p className="text-light mt-3">No top 10 movies available at the moment.</p>
        </div>
      ) : (
        <div className="topTen">
          {movies.slice(0, 10).map((movie, index) => (
            <div key={movie.id}>
              <div className="position-relative" style={{ width: "240px" }}>
                <SharedCard movie={movie}>
                  <div 
                    className="btnDetails bg-warning text-dark d-flex align-items-center justify-content-center"
                    style={{ width: "35px", height: "35px", zIndex: 1, left: "10px" }}
                  >
                    {index + 1}
                  </div>
                </SharedCard>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}