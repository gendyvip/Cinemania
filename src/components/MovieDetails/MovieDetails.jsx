import  { useEffect, useState } from "react";
import {  Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import SharedButtons from "../../shared/buttons/SharedButtons";
import { getAllTrailerById,  } from "../../API/trailerAPI";
import "./MovieDetails.css";
import SectionHeader from "../../shared/heading/SectionHeader";

export default function MovieDetails({ movieDetials, id }) {
  const [movieTrailers, setMovieTrailers] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    const handleScroll = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("scroll", handleScroll, { once: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    getAllTrailerById(id).then((res) => {
      setMovieTrailers(res.data.trailers);
    });
  }, [id]);
  return (
    <>
      <div style={{ backgroundColor: "#181818" }}>
        <div
          className="container container-fluid p-5 mt-5 text-white align-items-center"
          style={{
            position: "relative",
            minHeight: "100vh",
            overflow: "hidden",
            backgroundColor: "#181818",
          }}
        >
          {movieDetials?.Poster && (
            <div
              className="mb-5 container-fluid"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "60vh",
                backgroundImage: `url(${movieDetials.Poster})`,
                backgroundSize: "cover",
                border: "1px solid #181818",
                backgroundPosition: "center top",
                filter: "blur(5px)",
                opacity: 0.3,
                zIndex: 0,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    "linear-gradient(to bottom, rgba(24,24,24,0.4) 0%, rgba(24,24,24,1) 100%)",
                  zIndex: 1,
                }}
              />
            </div>
          )}

          <Container
            fluid
            className="px-4"
            style={{ position: "relative", zIndex: 2 }}
          >
            <Row className="align-items-start flex-column flex-md-row mb-4">
              <Col md className="mb-3 mb-md-0">
                <h1 className="fw-bold mb-0">{movieDetials?.Title}</h1>
                <div
                  className="small mt-1 fs-6"
                  style={{ color: "var(--cinemania-extended-gray)" }}
                >
                  {movieDetials?.Year} <span className="mx-2">·</span>
                  {movieDetials.Type?.split("")[0].toUpperCase() +
                    movieDetials.Type?.slice(1)}
                  <span className="mx-2">·</span>{" "}
                  {movieDetials.Runtime?.slice(0, 5)}
                </div>
              </Col>
              <Col
                md="auto"
                className="d-flex flex-wrap gap-4 justify-content-start justify-content-md-end"
              >
                <div className="text-md-end">
                  <div className="text-uppercase text-light small fw-semibold">
                    CineMania Rating
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-star-fill text-warning me-1"></i>
                    <span className="fw-bold me-1">
                      {movieDetials?.imdbRating == "N/A" ? (
                        "Not Rated"
                      ) : (
                        <>
                          <span className="text-light">
                            {" "}
                            {movieDetials?.imdbRating}
                          </span>
                          <span
                            style={{ color: "var(--cinemania-extended-gray)" }}
                          >{`/10`}</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <div className="text-md-end">
                  <div className="text-uppercase text-light small fw-semibold">
                    Popularity
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-graph-up-arrow text-success me-1"></i>
                    <span className="fw-bold text-success me-1">
                      {movieDetials?.Metascore == "N/A"
                        ? "12"
                        : movieDetials?.Metascore}
                    </span>
                    <span className="text-secondary small">
                      ↑
                      {movieDetials?.Metascore == "N/A"
                        ? "12"
                        : movieDetials?.Metascore}
                    </span>
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="g-4 flex-column flex-md-row">
              <Col md={3}>
                <div className="position-relative rounded overflow-hidden h-100">
                  <img
                    loading="lazy"
                    src={movieDetials?.Poster}
                    alt="Series Poster"
                    className="img-fluid rounded w-100"
                    style={{ maxHeight: "500px", objectFit: "cover" }}
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="position-relative rounded overflow-hidden h-100">
                  <iframe
                    style={{ opacity: 0.5 }}
                    width="100%"
                    height="100%"
                    src={movieTrailers?movieTrailers[0]?.trailerLink:""}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <Link
                    to={`/trailer/${movieDetials.id}`}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      zIndex: 1,
                      textDecoration: "none",
                    }}
                  >
                    <div style={{ width: "100%", height: "100%" }}></div>
                  </Link>{" "}
                  <div
                    variant="link"
                    className="position-absolute play-hover bottom-0 ms-3 start-0 mt-4 d-flex text-decoration-none align-items-center"
                  >
                    <i className="bi bi-play-circle me-2 fs-1"></i>{" "}
                    <span className=" fs-">
                      Play trailer
                    </span>{" "}
                  </div>
                  <div className="position-absolute bottom-0 end-0 m-3 text-end text-white">
                    <div>
                      <i className="bi bi-hand-thumbs-up me-1"></i> 81
                    </div>
                    <div>
                      <i className="bi bi-heart-fill text-danger me-1"></i> 52
                    </div>
                  </div>
                </div>
              </Col>

              <Col md={3}>
                <div className="d-flex flex-md-column gap-3 h-50">
                  <Link
                    className="flex-fill text-decoration-none "
                    style={{ color: "var(--cinemania-white)" }}
                    to={`/trailer/${movieDetials?.id}`}
                  >
                    <div className=" mt-2 bg-secondary bg-gradient bg-opacity-10 rounded text-center py-4">
                      <i className="bi bi-play-btn fs-3 text-warning"></i>
                      <div className="fw-bold">
                        {movieTrailers?.length}{" "}
                        {movieTrailers?.length <= 1 ? "VIDEO" : "VIDEOS"}
                      </div>
                    </div>
                  </Link>
                </div>
              </Col>
            </Row>
            {SharedButtons && (
              <SharedButtons
                genres={
                  movieDetials.Genre?.split(",")
                    ? movieDetials.Genre?.split(",")
                    : []
                }
              />
            )}
            <Row className="my-4">
              <Col md={8}>
                <p className="fw-semibold">{movieDetials?.Plot}</p>

                <div className="border-top border-secondary py-2 d-flex justify-content-between align-items-center">
                  <div>
                    <strong className="text-light  me-2">Director</strong>{" "}
                    <span className="text-details">
                      {movieDetials.Director}
                    </span>
                  </div>
                  <i className="bi bi-chevron-right text-white"></i>
                </div>

                <div className="border-top border-secondary py-2 d-flex justify-content-between align-items-center">
                  <div>
                    <strong className="text-light  me-2">Writers</strong>{" "}
                    <span className="text-details">
                      {movieDetials.Writer?.split(",")
                        .slice(0, movieDetials.Writer?.split(",").length)
                        .join(" . ")}
                    </span>
                  </div>
                  <i className="bi bi-chevron-right text-light  me-2"></i>
                </div>

                <div className="border-top border-secondary py-2 d-flex align-items-center gap-2">
                  <div>
                    <strong className="text-light  me-2">Stars</strong>{" "}
                    <span className="text-details">
                      {movieDetials.Actors?.split(",")
                        .slice(0, movieDetials.Actors?.split(",").length)
                        .join(" . ")}
                    </span>
                  </div>
                </div>
              </Col>
              <Col
                md={4}
                className="d-flex flex-column gap-3 align-items-start"
              ></Col>
            </Row>
          </Container>
          <Row style={{ marginBottom: "-35px" }}>
            <Col md={8}>
              <SectionHeader title={"Details"} />
              <div className="ms-3">
                <div className="container w-100 ms-0">
                  <div className="border-top border-secondary py-2 d-flex justify-content-between align-items-center">
                    <div>
                      <strong className="text-light me-2">Release date</strong>{" "}
                      <span className="text-details">
                        {movieDetials?.Released}
                      </span>
                    </div>
                    <i className="bi bi-chevron-right text-white"></i>
                  </div>
                </div>
                <div className="container  w-100 ms-0">
                  <div className="border-top border-secondary py-2 d-flex justify-content-between align-items-center">
                    <div>
                      <strong className="text-light  me-2">
                        Countries of origin
                      </strong>{" "}
                      <span className="text-details">
                        {movieDetials.Country}
                      </span>
                    </div>
                    <i className="bi bi-chevron-right text-white"></i>
                  </div>
                </div>
                <div className="container  w-100 ms-0">
                  <div className="border-top border-secondary py-2 d-flex justify-content-between align-items-center">
                    <div>
                      <strong className="text-light  me-2">Language</strong>{" "}
                      <span className="text-details">
                        {movieDetials?.Language}
                      </span>
                    </div>
                    <i className="bi bi-chevron-right text-white"></i>
                  </div>
                </div>
                <div className="container  w-100 ms-0">
                  <div className="border-top border-secondary py-2 d-flex justify-content-between align-items-center">
                    <div>
                      <strong className="text-light  me-2">Votes</strong>{" "}
                      <span className="text-details">
                        {movieDetials?.imdbVotes}
                      </span>
                    </div>
                    <i className="bi bi-chevron-right text-white"></i>
                  </div>
                </div>
                <div className="container  w-100 ms-0">
                  {movieDetials?.Rated == "N/A" ? (
                    ""
                  ) : (
                    <div className="border-top border-secondary py-2 d-flex justify-content-between align-items-center">
                      <div>
                        <strong className="text-light  me-2">Rated</strong>{" "}
                        <span className="text-details">
                          {movieDetials?.Rated}
                        </span>
                      </div>
                      <i className="bi bi-chevron-right text-white"></i>
                    </div>
                  )}
                </div>
              </div>
              {movieDetials?.BoxOffice == "N/A" ? (
                ""
              ) : (
                <div className="mt-5">
                  <SectionHeader title={"Box Office"} />
                  <div className="ms-4 d-flex align-items-center">
                    <h5 className="text-light me-2">Budget:</h5>
                    <h6 className="text-warning mt-1">{movieDetials?.BoxOffice}</h6>
                  </div>
                                    <div className="ms-4 d-flex align-items-center">
                    <h5 className="text-light me-2">Cinemania Votes:</h5>
                    <h6 className="text-warning mt-1">{movieDetials?.imdbVotes}</h6>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
