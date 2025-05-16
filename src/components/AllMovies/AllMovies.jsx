import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SharedCard from "../../shared/SharedCard";
import { getAllMovies } from "../../API/movieAPI";
import "./AllMovies.css";
import Spinner from "../Spinner/Spinner";

export default function AllMovies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getAllMovies();
        setMovies(response.data);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      {isLoading && (
          <Spinner load="Loading Movies..."  />
      )}

      {error && (
          <div className="alert alert-danger text-center">
            {error}
            <button
              className="btn btn-warning ms-3"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
      )}
      {!isLoading && !error && (
        <Container className="py-5 mt-5">
          <div className="mb-4 ">
            <h1 className="text-light">Cinemania Movies</h1>
            <div
              style={{
                width: 80,
                height: 6,
                background: "#f5c518",
                borderRadius: 3,
                marginBottom: 32,
              }}
            />
          </div>
          <div  className="allMovies">
            {movies.map((movie, index) => (
              <div key={movie.id + index}>
                <div className="position-relative" style={{ width: "240px" }}>
                  <SharedCard movie={movie}>
                    <div
                      className="btnDetails bg-warning text-dark d-flex align-items-center justify-content-center"
                      style={{
                        width: "35px",
                        height: "35px",
                        zIndex: 1,
                        left: "10px",
                      }}
                    >
                      {index + 1}
                    </div>
                  </SharedCard>
                </div>
              </div>
            ))}
          </div>
        </Container>
      )}
    </>
  );
}
