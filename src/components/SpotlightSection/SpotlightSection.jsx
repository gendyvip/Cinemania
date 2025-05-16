import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import styles from "./SpotlightSection.module.css";
import SwiperCustom from "../../shared/swipper/SwiperCustom";
import { getAllTrailerById } from "../../API/trailerAPI";
import { Link, useNavigate } from "react-router-dom";

export function SpotlightSection() {
  const [movieDetails, setMovieDetails] = useState({});
  const [movieTrailers, setMovieTrailers] = useState([]);
  const navigate = useNavigate()
  const id = "tt31193180"
  useEffect(() => {
      getAllTrailerById(id).then((res) => {
      setMovieDetails(res.data);
      setMovieTrailers(res.data.trailers);
    });
  }, []);


  const renderSpotlightItem = (item, index) => (
    <div className={styles.spotlightSlide} key={item.title}>
      <iframe
        width="100%"
        height="100%"
        src={item.trailerLink}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <Link
        to={`/trailer/${movieDetails?.id}`}
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
      </Link>
      <div className={styles.spotlightOverlay}>
        <i className={`bi ${item.icon} ${styles.spotlightIcon}`}></i>
        <span className={styles.spotlightTitle}>{item.movieTitle}</span>
      </div>
    </div>
  );

  return (
    <section className={styles.section}>
      <Container>
                <div
          className="d-flex sectoin-hover"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/trailer/tt31193180")}
        >
          <span
            className="ms-4 border-start border-5 border-warning"
            style={{ borderRadius: "3px" }}
          ></span>
          <h3 className="ms-2 text-light">
            Spotlight on Sinners <i className="bi bi-chevron-right"></i>
          </h3>
        </div>
        <div className="mt-2">
          <span
            className="text-muteded ms-4"
            style={{ color: "var(--cinemania-light-gray)" }}
          >
            Dive into photos, interviews, and more
          </span>
        </div>
        <SwiperCustom
          id="spotlight"
          items={movieTrailers}
          renderItem={renderSpotlightItem}
          slidesPerView={1.2}
          spaceBetween={20}
          breakpoints={{
            576: { slidesPerView: 2.2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 3 },
          }}
          className="pb-5"
        />
      </Container>
    </section>
  );
}
