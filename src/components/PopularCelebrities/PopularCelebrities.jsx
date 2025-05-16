import { useEffect, useState } from "react";
import styles from "./PopularCelebrities.module.css";
import SwiperCustom from "../../shared/swipper/SwiperCustom";
import { getPopularActors } from "../../API/actorAPI";
import { Link, useNavigate } from "react-router-dom";

export function PopularCelebrities() {
  const [popularActors, setPopularActors] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getPopularActors().then((res) => {
      setPopularActors(res.data.splice(0,10));
    });
  },[]);

  const renderCelebrity = (celebrity) => (
    <div className={styles.celebritySlide}>
      <div className={styles.imageContainer}>
        <Link to={`/actor/${celebrity.id}`}>
          <img
            loading="lazy"
            src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${celebrity?.profile_path}`}
            alt={celebrity.name}
            className={styles.celebrityImage}
          />
        </Link>
      </div>
      <div className={styles.rankContainer}>
        <span className={`fw-bold`} style={{color:"var(--cinemania-extended-gray)"}}><i className="text-success me-1 bi bi-graph-up-arrow"></i>{celebrity?.popularity}{" "}</span>
      </div>
      <p className={`fs-5`}>{celebrity.name}</p>
    </div>
  );

  return (
    <section className={styles.section}>
      <div className="container">
                  <div 
          className="d-flex sectoin-hover" 
          style={{ cursor: "pointer" }}
          onClick={() => navigate('/popular-celebrities')}
        >
          <span
            className="ms-4 border-start border-5 border-warning"
            style={{ borderRadius: "3px" }}
          ></span>
          <h3 className="ms-2 text-light">
            Most popular celebrities <i className="bi bi-chevron-right"></i>
          </h3>
        </div>
        <div className={`${styles.tabContainer} small ms-4 mt-1`}>
          <p style={{letterSpacing:"3px"}}>TOP RISING</p>
        </div>

        <SwiperCustom
          id="popular-celebrities"
          items={popularActors}
          renderItem={renderCelebrity}
          slidesPerView={6}
          spaceBetween={16}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 8 },
            640: { slidesPerView: 3, spaceBetween: 12 },
            768: { slidesPerView: 4, spaceBetween: 16 },
            1024: { slidesPerView: 6, spaceBetween: 16 },
          }}
        />
      </div>
    </section>
  );
}
