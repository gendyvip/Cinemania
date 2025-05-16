import React, { useEffect, useState } from 'react';
import FilmTailer from '../FilmTailer/FilmTailer';
import RealatedFilm from '../RealatedFilm/RealatedFilm';
import Spinner from '../Spinner/Spinner';
import { useParams } from 'react-router-dom';
import { getAllTrailerById } from '../../API/trailerAPI'
import {  getMovieById } from '../../API/movieAPI'

export default function Trailer() {
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [movieDetails, setMovieDetails] = useState({});
  const [movieTrailers, setMovieTrailers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    Promise.all([getAllTrailerById(id), getMovieById(id)])
      .then(([trailersRes, movieRes]) => {
        setMovieTrailers(trailersRes.data.trailers);
        setMovieDetails(movieRes.data);
      })
      .catch((error) => {
        console.error("Error loading trailer data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const getIndex = (index) => setIndex(index);

  if (loading) {
    return <Spinner load="Loading trailer..." />;
  }

  return (
    <>
      <FilmTailer index={index} movieDetails={movieDetails} movieTrailers={movieTrailers} />
      <RealatedFilm getIndex={getIndex} movieDetails={movieDetails} movieTrailers={movieTrailers} />
    </>
  );
}
