import { Container } from "react-bootstrap";
import SwiperCustom from "../../shared/swipper/SwiperCustom";
import SectionHeader from "../../shared/heading/SectionHeader";
import styles from "../SpotlightSection/SpotlightSection.module.css";
import { Link } from "react-router-dom";
export default function RealatedFilm({ getIndex,movieTrailers,movieDetails }) {
  const renderSpotlightItem = (item, index) => (
    <>
      <div className={styles.spotlightSlide} key={movieDetails.Title}>
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <iframe
            style={{ opacity: 0.5 }}
            width="100%"
            height="100%"
            src={movieTrailers[index]?.trailerLink}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          <Link
            onClick={() => getIndex(index)}
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
        </div>

        <div className={styles.spotlightOverlay}>
          <button style={{ background: "none", border: "none" }}>
            <i className={`bi ${item.icon} ${styles.spotlightIcon}`}></i>
          </button>
          <span className={styles.spotlightTitle}>{item.time}</span>
        </div>
      </div>
      <div style={{ width: "90%", marginTop: "10px" }}>
        <a href="" style={{ color: "white", textDecoration: "none" }}>
          <h1
            className={styles.aaa}
            style={{ fontSize: "20px", fontWeight: "500" }}
          >
            {item.title}
          </h1>
        </a>
      </div>
    </>
  );

  return (
    <section className={styles.section}>
      <Container>
        <SectionHeader title="Realted Videos" />

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
