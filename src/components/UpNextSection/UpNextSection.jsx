import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "./UpNext.css";
import "swiper/css/navigation";
import {  useState } from "react";
import { Link } from "react-router-dom";

export default function UpNextSection({upNextMovies}) {
  const [activeVideo, setActiveVideo] = useState(null);
  const handleSlideChange = (swiper) => {
    const iframes = document.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      iframe.contentWindow.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        "*"
      );
    });
    setActiveVideo(swiper.activeIndex);
  };

  return (
    <div style={{ marginTop: "100px" }} className="container text-white">
      <div className="row">
        <div className="col-lg-8 position-relative mb-4">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            className="mySwiper"
            onSlideChange={handleSlideChange}
            onInit={(swiper) => setActiveVideo(swiper.activeIndex)}
          >
            {upNextMovies.map((video, index) => (
              <SwiperSlide key={video.id + index}>
                <div className="position-relative">
                  <div
                    style={{
                      width: "100%",
                      height: "450px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      backgroundColor: "#000",
                    }}
                  >
                    {activeVideo === index ? (
                      <iframe
                        src={`${
                          video?.trailers? video?.trailers[0]?.trailerLink:"https://www.youtube.com/embed/beg2pnU-0OU"
                        }?autoplay=0&mute=1&enablejsapi=1`}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video.Title}
                      ></iframe>
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          backgroundImage: `url(${video.Poster})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>
                    )}
                  </div>

                  <div
                    className="veido-up position-absolute bottom-0 start-0 w-100"
                    style={{
                      background:
                        "linear-gradient(transparent, rgba(0,0,0,0.8))",
                      display: "flex",
                      alignItems: "end",
                      gap: "20px",
                    }}
                  >
                    <Link to={`/movie/${video?.id}`}>
                      <img
                        className="mb-2 image-in-upnext position-relative"
                        src={video?.Poster}
                        alt={video?.Title}
                      />
                    </Link>
                      <div
                        className="mb-5 me-5 hideDetails"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(0, 0, 0, 0) 0%, #000000 100%)",
                          padding: "14px",
                          borderRadius: "10px",
                        }}
                      >
                        <Link
                          className="text-decoration-none"
                          to={`/trailer/${video?.id}`}
                        >
                          <div className="d-flex align-items-start mb-2">
                            <div className="play-button me-3">
                              <button className="btn btn-outline-light rounded-circle">
                                <i className="bi bi-play-fill fs-4"></i>
                              </button>
                            </div>
                            <div>
                              <h3 className="text-light vedio-up-h3 mb-0">
                                {video.Title}
                              </h3>
                              <p
                                className="vedio-up-p mb-2"
                                style={{
                                  color: "#fff",
                                  width:"350px"
                                }}
                              >
                                {video?.Plot?.slice(0, 100) + "..."}
                              </p>
                            </div>
                          </div>
                        </Link>

                        <div className="ms-5 likes ">
                          <div className="me-3">
                            <span className="ms-3">
                              👍 {video?.Ratings[1]?.Value?.slice(0, 2) || 157}
                            </span>
                          </div>
                          <div>
                            <span>
                              ❤️ {video?.Ratings[2]?.Value?.slice(0, 2) || 281}
                            </span>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div
            className="swiper-button-prev position-absolute top-50 start-10 translate-middle-y"
            style={{ zIndex: 10, color: "white", left: "30px" }}
          ></div>
          <div
            className="swiper-button-next position-absolute top-50 end-10 translate-middle-y"
            style={{ zIndex: 10, color: "white", right: "30px" }}
          ></div>
        </div>
        <div className="col-lg-4">
          <div>
            <h4 className="text-warning mb-2" style={{ fontWeight: "bold" }}>
              Up Next
            </h4>

            <div className="vedio-upNext">
              {upNextMovies.slice(11, 14).map((video) => (
                <div key={video.id} className="d-flex mb-3">
                  <div
                    className="position-relative"
                    style={{ height: "100px" }}
                  >
                    <Link to={`/trailer/${video.id}`}>
                      <img
                        src={video.Poster}
                        alt={video.Title}
                        style={{
                          width: "90px",
                          height: "100%",
                          objectFit: "cover",
                          cursor: "pointer",
                          borderRadius: "13px",
                        }}
                      />
                      <div className="position-absolute top-50 start-50 translate-middle">
                        <button className="btn btn-outline-light rounded-circle btn-sm">
                          <i className="bi bi-play-fill"></i>
                        </button>
                      </div>
                    </Link>
                  </div>

                  <div className="ms-3">
                    <h6 className="my-1">{video.Title}</h6>
                    <p className="text-secondary mb-2">
                      {video?.trailers[0]
                        ? video?.trailers[0]?.name?.slice(0, 50) + "..."
                        : "Official Trailer"}
                    </p>
                    <div className="d-flex">
                      <div className="me-2">
                        <small>
                          👍 {video?.Ratings[1]?.Value?.slice(0, 2) || 151}
                        </small>
                      </div>
                      <div>
                        <small>
                          ❤️ {video?.Ratings[2]?.Value?.slice(0, 2) || 187}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <Link to="/trailers" style={{ textDecoration: "none" }}>
                <button
                  className="imdb-btn d-flex align-items-center px-3 py-2 rounded-pill shadow-sm"
                  style={{
                    fontWeight: 700,
                    fontSize: "1rem",
                    borderWidth: 2,
                    borderColor: "#f5c518",
                    color: "#f5c518",
                    background: "transparent",
                    transition: "all 0.2s",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "#f5c518";
                    e.currentTarget.style.color = "#222";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#f5c518";
                  }}
                >
                  <span className="me-2">Browse trailers</span>
                  <i
                    className="bi bi-chevron-right"
                    style={{ fontWeight: 900 }}
                  ></i>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
