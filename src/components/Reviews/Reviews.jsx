import { Link, useParams } from "react-router-dom";
import SectionHeader from "../../shared/heading/SectionHeader";
import "./Reviews.css";
import { updateReviewReaction } from "../../API/movieAPI";
import { useState } from "react";
export default function Reviews({ movieDetials }) {
  const { id: movieId } = useParams();

  const review = movieDetials.reviews?.[0];
  const reviewIndex = 0;

  const [likes, setLikes] = useState(review?.likes || 0);
  const [dislikes, setDislikes] = useState(review?.dislikes || 0);

  const handleReaction = async (type) => {
    const reactionKey = `reaction-${movieId}-${reviewIndex}`;
    const alreadyReacted = localStorage.getItem(reactionKey);

    if (alreadyReacted) {
      alert("You already reacted to this review.");
      return;
    }

    try {
      await updateReviewReaction(movieId, reviewIndex, type);
      localStorage.setItem(reactionKey, type);
      if (type === "like") setLikes(likes + 1);
      if (type === "dislike") setDislikes(dislikes + 1);
    } catch (err) {
      console.error("Error updating reaction:", err);
    }
  };

  return (
    <div style={{ backgroundColor: "#181818" }}>
      <div className="container py-3">
        <div className="row">
          <div className="col-12 col-lg-10 col-xl-8">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 mb-md-4 gap-2 ps-0 ps-md-2">
              <Link
                style={{ marginBottom: "-18px" }}
                to={`/movie/${movieDetials?.id}/reviews`}
                className="text-decoration-none  d-flex flex-row text-white"
              >
                <div style={{ marginLeft: "35px" }}>
                  <SectionHeader title="User reviews" />
                </div>
                <h3 className="ms-2">
                  <i className="bi bi-chevron-right"></i>
                </h3>
              </Link>
            </div>
            <div
              className="card bg-transparent shadow-sm  border-0 rounded-3"
              style={{ marginLeft: "60px" }}
            >
              <div
                className="card-body text-light p-3 p-md-4"
                style={{ backgroundColor: "#0c0c0c",borderRadius:"1rem" }}
              >
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-2 mb-md-3 gap-1 gap-md-2">
                  <span className="badge bg-warning text-dark fw-semibold fs-7">
                    FEATURED REVIEW
                  </span>
                  <div className="position-absolute top-0 end-0 mt-2 me-3 d-flex align-items-center bg-warning bg-opacity-10 px-3 py-1 rounded-pill">
                    <i className="bi bi-star-fill text-warning me-2"></i>
                    <small className="fw-semibold text-white">
                      {review?.rating || ""}/10
                    </small>
                  </div>
                </div>

                <h5 className="card-title fw-bold text-light mb-2 mb-md-3 fs-5 fs-md-4">
                  {review?.title || ""}
                </h5>

                <div className="card-text text-secondary mb-3">
                  <p className="mb-0 fs-6">
                    {review?.content?.slice(0, 300) + "..." || ""}
                  </p>
                </div>

                <hr className="my-3" />

                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 gap-sm-3">
                  <div className="d-flex flex-wrap gap-1 gap-sm-2">
                    <button
                      className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2"
                      onClick={() => handleReaction("like")}
                    >
                      <i className="bi bi-hand-thumbs-up-fill"></i>
                      <span className="fw-medium">Helpful · {likes}</span>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2"
                      onClick={() => handleReaction("dislike")}
                    >
                      <i className="bi bi-hand-thumbs-down-fill"></i>
                      <span className="fw-medium">{dislikes}</span>
                    </button>
                  </div>
                  <div
                    style={{
                      color: "#9a9a9a",
                      fontSize: "15px",
                      fontWeight: "600",
                    }}
                    className="small text-end"
                  >
                    <span className="fw-semibold text-white">{review?.author}</span>
                    <span className="mx-1">·</span>
                    <span>
                      {review?.created_at.slice(0, 10)} · {review?.created_at.slice(11, 19)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
