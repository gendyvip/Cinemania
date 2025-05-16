import { useNavigate } from "react-router-dom";
import "./KnownForCard.css";
import { useEffect, useState } from "react";
import { getAllMovies } from "../../API/movieAPI";
export default function KnownForCard({ item, actorTrailers }) {
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState({});
  useEffect(() => {
    getAllMovies().then((res) => {
      setMovieDetails(
        res.data.filter((movie) =>
          movie.Title.toLowerCase().includes(item.title.toLowerCase())
        )
      );
    });
  }, []);

  return (
    <>
      <div
        onClick={() => {
          if (!movieDetails[0]?.id) {
            navigate(`/not-found`);
          } else {
            navigate(`/movie/${movieDetails[0]?.id}`);
          }
        }}
        className="card-know"
      >
        <img src={item?.poster_path} draggable="false" />
        <div className="card-know-info">
          <h5>
            <span>★</span> {item?.vote_average.toFixed(1)}/10
          </h5>
          <div>{item?.title}</div>
          <p>{item?.character}</p>
          {item?.isTV ? item?.release_date : <p>{item?.release_date}</p>}
        </div>
        <div className="icon-card-know">
          <i
            className="bi bi-info-circle text-warning"
            style={{ cursor: "pointer" }}
          ></i>
        </div>
      </div>
    </>
  );
}
