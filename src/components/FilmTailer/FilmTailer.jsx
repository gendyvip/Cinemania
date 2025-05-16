import { Link, useParams } from "react-router-dom";
import "./FilmTailer.css";
import { useEffect, useState } from "react";
import { getAllTrailerById } from "../../API/trailerAPI";
import { getMovieById } from "../../API/movieAPI";

export default function FilmTailer({ index,movieDetails,movieTrailers }) {
  const { id } = useParams();
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
  return (
    <div className="container tailer">
      <div className="tail tailer-video">
        <iframe
          width="100%"
          height="100%"
          src={`${movieTrailers?movieTrailers[index]?.trailerLink:"https://www.youtube.com/embed/BQvEuQ4ICEA"}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="video-rection">
          <button>
            <i className="bi bi-hand-thumbs-up"></i> <span>611</span>
          </button>
          <button>
            <i className="bi bi-hand-thumbs-down"></i>
          </button>
          <button>
            <i className="bi bi-emoji-smile"></i>
          </button>
          <div
            style={{ width: "2px", height: "28px", backgroundColor: "gray" }}
          />
          <button className="imoje">
            <i style={{ color: "#ee3e81" }} className="bi bi-heart-fill"></i>{" "}
            <span>115</span>
          </button>
          <button className="imoje">
            <i style={{ color: "#fdd856" }} className="bi bi-emoji-neutral"></i>{" "}
            <span>25</span>
          </button>
          <button className="imoje">
            <i style={{ color: "#fdd856" }} className="bi bi-emoji-frown"></i>{" "}
            <span>30</span>
          </button>
          
        </div>
      </div>
      <div className="tail tailer-info">
        <Link
          to={`/movie/${id}`}
          className="info1 text-decoration-none text-light"
        >
          <img
            loading="lazy"
            src={movieDetails?.Poster}
            draggable="false"
            width={"90px"}
            height={"130px"}
            style={{
              borderRadius: "15px",
              objectFit: "cover",
              cursor: "pointer",
            }}
          />
          <div className="more">
            <div className="more1">
              <h1>
                {movieDetails?.Title} ({movieDetails?.Year})
              </h1>
              <p style={{ color: "var(--cinemania-extended-gray)" }}>
                {movieDetails.Genre?.split(",").join(" . ")}
              </p>
            </div>
            <button>
              <i className="bi small bi-chevron-right"></i>
            </button>
          </div>
        </Link>

        <div
          style={{
            width: "100%",
            border: "1px solid gray",
            marginTop: "25px",
            marginBottom: "25px",
          }}
        />

        <div className="info2">
          <h1>{movieTrailers?movieTrailers[0]?.name:"Not Exist"}</h1>
          <p>{movieDetails?.Plot}</p>
        </div>
      </div>
    </div>
  );
}
