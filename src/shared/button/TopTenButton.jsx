import { useEffect, useState } from "react";
import styles from "./Button.module.css";
import { getAllMovies } from "../../API/movieAPI";

const TopTenButton = ({ getTopTenMovie, movie }) => {
  return (
    <button
      onClick={() => {
        getTopTenMovie(movie);
      }}
      data-bs-toggle="modal"
      data-bs-target="#topTenModal"
      className={`btn w-25 details px-1 fs-6 ${styles.btnDetails}`}
    >
      <i className="bi bi-info-square-fill"></i>
    </button>
  );
};

export default TopTenButton;
