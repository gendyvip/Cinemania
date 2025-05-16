import styles from "./SharedCard.module.css";
import { Link } from "react-router-dom";
import "./SharedCard.css";

const SharedCard = ({ movie ,children}) => {
  return (
    <>
      <div className={`card ${styles.card}`}>
        <div className={`${styles.cardHeader}`}>
          <Link to={`/movie/${movie.id}/`}>
            <img
              src={movie?.Poster}
              alt={movie?.Title}
              className={styles.cardImage}
            />
          </Link>
        </div>
        <div className="card-body">
          <div className="d-flex flex-column mb-3">
            <h5 className="card-title mb-2">
              {movie.Title?.length > 12
                ? movie.Title?.slice(0, 14) + "..."
                : movie?.Title}
            </h5>
            <span className={styles.rating}>
              <i className="bi bi-star-fill  fs-6"></i>
              <span style={{ color: "var(--cinemania-extended-gray)" }}>
                {" "}
                {movie.imdbRating=="N/A"?"Not Rated":movie?.imdbRating}
              </span>
            </span>
          </div>
          <div className="d-flex td_container flex-row gap-2">
            <Link
              to={`/trailer/${movie?.id}`}
              className={`btn trailer w-75 fs-6 ${styles.btnTrailer}`}
            >
              <i className="bi bi-film"></i> Trailer
            </Link>
                {children}
          </div>
        </div>
      </div>
    </>
  );
};
export default SharedCard;
