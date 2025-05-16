import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="container flex-column d-flex justify-content-center align-items-center mt-5"
      style={{ minHeight: "calc(100vh - 311px)" }}
    >
      <img src="../../assets/imgs/NotFound.png" alt="" className="w-25 img-fluid mt-5" loading="lazy" />
      <img
      loading="lazy"
        src="../../assets/imgs/9a7c052e-7571-4e7f-ad5b-e72f51c45202.png"
        alt=""
        className="w-25 my-3 img-fluid"
      />
      <Link
        to="/"
        className="btn text-light"
        style={{
          backgroundColor: "var(--cinemania-dark-gray)",
          width: "400px",
        }}
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
