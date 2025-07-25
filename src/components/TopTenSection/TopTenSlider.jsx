import { useState } from "react";
import SharedCard from "../../shared/SharedCard";
import SwiperCustom from "../../shared/swipper/SwiperCustom";
import TopTenButton from "./../../shared/button/TopTenButton";
import "./TopTenSection.css";
import { useNavigate } from "react-router-dom";

const TopTenSlider = ({ movies }) => {
  const [topTenMovieDetails, setTopTenMovieDetails] = useState({});
  const navigate = useNavigate();

  let getTopTenMovie = (movie) => {
    setTopTenMovieDetails(movie);
  };

  const renderTopTen = (movie) => (
    <SharedCard movie={movie}>
      <TopTenButton movie={movie} getTopTenMovie={getTopTenMovie}  topTenMovieDetails={topTenMovieDetails}/>
    </SharedCard>
  );

  return (
    <>
      <div className="container mt-5">
        <div
          className="d-flex sectoin-hover"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/movies/top-ten")}
        >
          <span
            className="ms-4 border-start border-5 border-warning"
            style={{ borderRadius: "3px" }}
          ></span>
          <h3 className="ms-2 text-light">
            Top 10 on Cinemania this week{" "}
            <i className="bi bi-chevron-right"></i>
          </h3>
        </div>
        <div className="mt-2">
          <span
            className="text-muteded ms-4"
            style={{ color: "var(--cinemania-light-gray)" }}
          >
            Most popular movies and TV shows this week
          </span>
        </div>
        <SwiperCustom
          id="top-ten"
          items={movies.slice(0, 10)}
          renderItem={renderTopTen}
          slidesPerView={6}
          spaceBetween={0}
          breakpoints={{
            320: { slidesPerView: 1.5 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1400: { slidesPerView: 5 },
            1600: { slidesPerView: 6 },
          }}
        />
        <div
          className="modal fade"
          id="topTenModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered border-secondary">
            <div className="modal-dialog modal-dialog-centered border-secondary">
              <div className="modal-content">
                <div
                  className="modal-header"
                  style={{
                    backgroundColor: "var(--cinemania-dark-gray)",
                    color: "var(--cinemania-white)",
                    border: "1px solid var(--cinemania-medium-gray)",
                  }}
                >
                  <button
                    type="button"
                    className="bg-light me-3 my-3 btn-close position-absolute top-0 end-0"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                  <div className="card-body">
                    <div className="d-flex gap-3">
                      <a href={`/movie/${topTenMovieDetails?.id}`}>
                        <img
                          loading="lazy"
                          src={topTenMovieDetails?.Poster}
                          alt="The Amateur movie poster"
                          style={{
                            borderRadius: "10px",
                            objectFit: "contain",
                            width: "100px",
                            height: "150px",
                          }}
                        />
                      </a>
                      <div className="modal-body-details">
                        <a
                          href={`/movie/${topTenMovieDetails?.id}`}
                          className="card-title-hover text-decoration-none"
                        >
                          <h4
                            className="card-title  mb-2 fs-6"
                            style={{ color: "var(--cinemania-white)" }}
                          >
                            {topTenMovieDetails?.Title}{" "}
                            <i className="chev-right bi bi-chevron-right"></i>
                          </h4>
                          <h3>{}</h3>
                        </a>
                        <div
                          className="mb-2 fs-6 d-flex flex-column"
                          style={{ color: "var(--cinemania-extended-gray)" }}
                        >
                          <div>
                            <span className="text-light">
                              {(
                                Number(
                                  topTenMovieDetails?.Runtime?.slice(0, 3)
                                ) / 60
                              ).toFixed(2)}
                            </span>{" "}
                            <span className="text-light">Hours</span> {" . "}
                            <span className="text-warning">
                              {topTenMovieDetails?.Year}
                            </span>
                          </div>
                          <span
                            className="me-2 fs-6 mt-2"
                            style={{ color: "var(--cinemania-yellow)" }}
                          >
                            <i className="bi bi-star-fill"></i>{" "}
                            <span style={{ color: "var(--cinemania-white)" }}>
                              {" "}
                              <span className="text-light">
                                {topTenMovieDetails.imdbRating == "N/A"
                                  ? "Not Rated"
                                  : topTenMovieDetails.imdbRating + "/10"}
                              </span>
                            </span>
                          </span>
                        </div>
                        <div className="d-flex flex-column">
                          <span className="">
                            {topTenMovieDetails.Genre?.split(",").join(" . ")}
                          </span>
                          <span className="text-secondary mt-1">
                            <span className="text-light">By:</span>{" "}
                            {topTenMovieDetails.Director?.split(",").join(
                              " & "
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="card-text my-3">{topTenMovieDetails?.Plot}</p>

                    <div
                      className="border-top pt-3"
                      style={{ borderColor: "var(--cinemania-medium-gray)" }}
                    >
                      <small style={{ color: "var(--cinemania-light-gray)" }}>
                        Details of {topTenMovieDetails?.Title}
                        <br />
                        <span style={{ color: "var(--cinemania-yellow)" }}>
                          Country: {topTenMovieDetails?.Country}
                        </span>
                        <br />
                        <span style={{ color: "var(--cinemania-yellow)" }}>
                          BoxOffice:{" "}
                          {topTenMovieDetails.BoxOffice == "N/A"
                            ? "Not enough data"
                            : topTenMovieDetails.BoxOffice}
                        </span>
                        <br />
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopTenSlider;
