import  { useEffect, useState } from "react";
import MovieDetails from "../components/MovieDetails/MovieDetails";
import Reviews from "../components/Reviews/Reviews";
import { getMovieById } from "../API/movieAPI";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";

const Movie = () => {
  const { id } = useParams();
  const [movieDetials, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getMovieById(id)
      .then((res) => {
        setMovieDetails(res.data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading || !movieDetials) {
    return (
        <Spinner load="Loading Movie..." />
    );
  }
  return (
    <>
      <MovieDetails movieDetials={movieDetials} id={id} />
      <Reviews movieDetials={movieDetials} />
    </>
  );
};

export default Movie;
