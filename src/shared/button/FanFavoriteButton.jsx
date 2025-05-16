import  { useEffect, useState } from "react";
import styles from "./Button.module.css";
import { getAllMovies } from "../../API/movieAPI";

const FanFavoriteButton = ({ getFanFavoriteMovie,movie }) => {
    return (
           <button
      onClick={() => {
        getFanFavoriteMovie(movie);
      }}
      data-bs-toggle="modal"
      data-bs-target="#fanFavoriteModal"
      className={`btn w-25 details px-1 fs-6 ${styles.btnDetails}`}
    >
      <i className="bi bi-info-square-fill"></i>
    </button>
    );
}

export default FanFavoriteButton;


