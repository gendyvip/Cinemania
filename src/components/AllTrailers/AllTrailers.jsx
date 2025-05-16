import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getAllMovies } from "../../API/movieAPI";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const imdbYellow = "#f5c518";
const cardShadow = "0 2px 12px rgba(0,0,0,0.18)";

const AllTrailers = () => {
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
        setError("Failed to load trailers. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      {isLoading && (
        <div style={{ background: "#181818", minHeight: "100vh" }}>
            <Spinner load="Loading Trailers..." />
        </div>
      )}

      {error && (
        <div style={{ background: "#181818", minHeight: "100vh" }}>
            <div className="alert alert-danger text-center">
              {error}
              <button
                className="btn btn-warning ms-3"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
        </div>
      )}

      {!isLoading && !error && (
        <div
          className="mt-5"
          style={{ background: "#181818", minHeight: "100vh", padding: "0" }}
        >
          <Container className="text-white py-5">
            <h1 className="mb-2" style={{ fontWeight: 700, fontSize: "2.5rem" }}>
              All Trailers
            </h1>
            <div
              style={{
                width: 80,
                height: 6,
                background: imdbYellow,
                borderRadius: 3,
                marginBottom: 32,
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "25px",
              }}
            >
              {movies.map((movie, index) => (
                <div key={movie?.id + `${index}`}>
                  <div
                    style={{
                      background: "#232323",
                      borderRadius: 16,
                      boxShadow: cardShadow,
                      overflow: "hidden",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      minHeight: 520,
                      display: "flex",
                      flexDirection: "column",
                      padding: 0,
                      width: "300px",
                      flex: 1,
                    }}
                    className="h-100 imdb-trailer-card group"
                  >
                    <Link to={`/trailer/${movie?.id}`}>
                      <div style={{ position: "relative" }}>
                        <img
                          loading="lazy"
                          src={movie?.Poster}
                          alt={movie?.Title}
                          style={{
                            width: "100%",
                            height: "300px",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: 0,
                            height: "45%",
                            background:
                              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(24,24,24,0.95) 100%)",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: 14,
                            left: 14,
                            background: imdbYellow,
                            color: "#222",
                            fontWeight: 700,
                            fontSize: 13,
                            borderRadius: 8,
                            padding: "2px 12px",
                            zIndex: 2,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                          }}
                        >
                          {String(
                            movie?.Type?.split("").slice(0, 1)[0].toUpperCase()
                          ) + String(movie?.Type?.split("").slice(1, 5).join(""))}
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 2,
                            background: "rgba(0,0,0,0.55)",
                            borderRadius: "50%",
                            width: 56,
                            height: 56,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "background 0.2s, box-shadow 0.2s",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
                          }}
                          className="play-btn"
                        >
                          <i
                            className="bi bi-play-fill"
                            style={{ fontSize: 32, color: imdbYellow }}
                          ></i>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            right: 14,
                            bottom: 14,
                            background: "rgba(0,0,0,0.7)",
                            borderRadius: 8,
                            padding: "2px 10px",
                            fontSize: 15,
                            color: "#fff",
                            fontWeight: 600,
                            zIndex: 2,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <i
                            className="bi bi-clock me-1"
                            style={{ color: imdbYellow, fontSize: 17 }}
                          ></i>
                          {movie?.Runtime}
                        </div>
                      </div>
                    </Link>
                    <div className="p-3 d-flex flex-column flex-grow-1 justify-content-between">
                      <div>
                        <h5
                          style={{
                            fontWeight: 700,
                            color: "#fff",
                            marginBottom: 4,
                            fontSize: 18,
                          }}
                        >
                          {movie?.Title}
                        </h5>
                        <div
                          style={{
                            color: "#aaa",
                            fontSize: 14,
                            marginBottom: 2,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {movie.trailers ? movie.trailers[0]?.name : ""}
                        </div>
                        <div
                          style={{
                            color: "#bdbdbd",
                            fontSize: 15,
                          }}
                        >
                          <div className="mt-3">
                            <i
                              className="bi bi-calendar-event me-1"
                              style={{ color: "#fff" }}
                            ></i>
                            <span
                              className="text-warning"
                              style={{ fontWeight: "bold" }}
                            >
                              Released:
                            </span>{" "}
                            {movie?.Released}
                          </div>
                          <div
                            className="my-1"
                            style={{
                              color: "#bdbdbd",
                              fontSize: 14,
                            }}
                          >
                            <i
                              className="bi bi-person-video2  me-1"
                              style={{ color: "#fff" }}
                            ></i>
                            <span
                              className="text-warning"
                              style={{ fontWeight: "bold" }}
                            >
                              Cast:
                            </span>{" "}
                            {movie?.Actors?.split(",").slice(0, 2).join(" . ")}
                          </div>
                          <div
                            style={{
                              color: "#bdbdbd",
                              fontSize: 14,
                            }}
                          >
                            <i
                              className="bi bi-person-workspace me-1"
                              style={{ color: "#fff" }}
                            ></i>
                            <span
                              className="text-warning"
                              style={{ fontWeight: "bold" }}
                            >
                              Director:
                            </span>{" "}
                            {movie?.Director}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
          <style>{`
            .imdb-trailer-card:hover {
              transform: scale(1.025);
              box-shadow: 0 6px 32px rgba(0,0,0,0.28);
            }
            .imdb-trailer-card .play-btn:hover {
              background: rgba(245,197,24,0.18);
              box-shadow: 0 4px 16px rgba(245,197,24,0.18);
            }
            @media (max-width: 768px) {
              .imdb-trailer-card img {
                height: 320px !important;
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default AllTrailers;