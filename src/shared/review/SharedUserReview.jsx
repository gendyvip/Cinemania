import  { useState } from "react";
import { Card } from "react-bootstrap";
import { updateReviewReaction } from "../../API/movieAPI";
export default function SharedUserReview({
  rating,
  title,
  content,
  author,
  created_at,
  movieId,
  reviewIndex,
  onReactionUpdate,
  likes = 0,
  dislikes = 0,
}) {
  const [expanded, setExpanded] = useState(false);
  const isLong = content.length > 300;
  const displayText = expanded || !isLong ? content : content.slice(0, 300);

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
      onReactionUpdate();
    } catch (err) {
      console.error("Error updating reaction:", err);
    }
  };

  return (
    <Card className="mb-4 border-0 rounded-4 p-3 cardReviewsInfo">
      <Card.Body className="position-relative">
        <div className="position-absolute top-0 end-0 mt-2 me-3 d-flex align-items-center bg-warning bg-opacity-10 px-3 py-1 rounded-pill">
          <i className="bi bi-star-fill text-warning me-2"></i>
          <small className="fw-semibold text-white">{rating}/10</small>
        </div>
        <Card.Title as="h5" className="fw-bold mb-2">
          {title} <i className="bi bi-chevron-right text-dark"></i>
        </Card.Title>
        <Card.Text style={{ whiteSpace: "pre-line", color: "#6d7279" }}>
          {displayText}
          {isLong && (
            <span
              onClick={() => setExpanded(!expanded)}
              className="text-warning fw-medium ms-2"
              style={{ cursor: "pointer" }}
            >
              {expanded ? (
                <>
                  <span onClick={() => setExpanded(!expanded)}>
                    <i className="bi bi-chevron-up me-1"></i>Show Less
                  </span>
                </>
              ) : ( <span> <i className="bi bi-chevron-down me-1"></i>Read More</span> )}
            </span>
          )}
        </Card.Text>

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mt-5">
          <div className="d-flex gap-2">
            <button
              className="btn-card-reviews"
              onClick={() => handleReaction("like")}
            >
              <i
                style={{ marginRight: "10px" }}
                className="bi bi-hand-thumbs-up"
              ></i>
              <span className="fw-medium">{likes}</span>
            </button>
            <button
              className="btn-card-reviews"
              onClick={() => handleReaction("dislike")}
            >
              <i
                style={{ marginRight: "10px" }}
                className="bi bi-hand-thumbs-down"
              ></i>
              <span className="fw-medium">{dislikes}</span>
            </button>
          </div>

          <div
            style={{ color: "#9a9a9a", fontSize: "15px", fontWeight: "600" }}
            className="small text-end"
          >
            <span className="fw-semibold text-white">{author}</span>
            <span className="mx-1">·</span>
            <span>
              {created_at.slice(0, 10)} · {created_at.slice(11, 19)}
            </span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
