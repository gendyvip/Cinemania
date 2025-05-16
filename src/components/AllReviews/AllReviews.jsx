import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getMovieById, addReviewToMovie } from "../../API/movieAPI";
import SharedUserReview from "../../shared/review/SharedUserReview";
import "../../../src/App.css";
import Spinner from "../Spinner/Spinner";

export default function UserReviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    const handleScroll = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("scroll", handleScroll, { once: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      setIsLoading(true);
      const res = await getMovieById(id);
      setMovieDetails(res.data);
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to fetch movie:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    const form = e.target;
    setIsSubmitting(true);

    const newReview = {
      title: form.title.value,
      rating: form.rating.value,
      content: form.content.value,
      author: "Anonymous",
      created_at: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
    };

    setMovieDetails((prev) => ({
      ...prev,
      reviews: [newReview, ...(prev.reviews || [])],
    }));

    try {
      setIsLoading(true);
      await addReviewToMovie(id, newReview);
    } catch (error) {
      console.error("Error saving review:", error);
      setMovieDetails((prev) => ({
        ...prev,
        reviews: prev.reviews.filter(
          (r) => r.created_at !== newReview.created_at
        ),
      }));
      alert("Something went wrong while saving the review.");
    } finally {
      setShowModal(false);
      form.reset();
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="my-5 min-vh-100 user-reviews">
      {isLoading && (
          <Spinner load="Loading Reviews..." />
      )}
      {!isLoading && (
        <>
          <div className="text-white p-4 rounded">
            <div className="container d-flex flex-column align-items-start gap-3 mt-4">
              <div className="position-relative">
                <div className="mb-3">
                  <button className="btn-sm" onClick={() => navigate(-1)}>
                    <i className="bi bi-arrow-left me-2"></i> Back
                  </button>
                </div>
              </div>
              <div className="userReviwInfo">
                <img
                  src={movieDetails?.Poster}
                  alt={movieDetails?.Title || "Movie Poster"}
                  className="rounded shadow-sm"
                  style={{
                    width: "130px",
                    height: "170px",
                    objectFit: "cover",
                  }}
                />
                <div>
                  <h5 className="fw-4 text-secondary mb-2 fs-4">
                    {movieDetails?.Title}
                  </h5>
                  <h2 className="fw-bold text-white mb-0">User reviews</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="container mt-5 card-revies">
            <div className="d-flex justify-content-between align-items-center mb-4 ps-3">
              <h4 style={{ fontSize: "25px", fontWeight: "bold" }}>
                {movieDetails?.reviews?.length || 0} reviews
              </h4>
              <Button
                variant="warning"
                onClick={() => setShowModal(true)}
                style={{
                  fontSize: "15px",
                  fontWeight: "600",
                  padding: "10px 15px",
                  borderRadius: "7px",
                }}
              >
                <i
                  style={{
                    marginRight: "10px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                  className="bi bi-plus-lg"
                ></i>{" "}
                Review
              </Button>
            </div>

            {movieDetails?.reviews?.map((review, index) => (
              <SharedUserReview
                key={index}
                {...review}
                movieId={id}
                reviewIndex={index}
                onReactionUpdate={fetchMovie}
              />
            ))}
          </div>
        </>
      )}
      {showModal && (
        <div className="review-modal-wrapper">
          <style>
            {`
          /* Core Modal Styling */
          .review-modal-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1050;
            background-color: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(5px);
            animation: fadeIn 0.3s ease-out forwards;
          }
          
          .modal-dialog {
            width: 100%;
            max-width: 550px;
            margin: 1.75rem auto;
            animation: slideDown 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
            position: relative;
          }
          
          .modal-content {
            background: radial-gradient(ellipse at top, #2c2c2c, #1a1a1a);
            color: #fff;
            border: 1px solid rgba(255, 193, 7, 0.3);
            border-radius: 12px;
            box-shadow: 
              0 20px 40px rgba(0, 0, 0, 0.4),
              0 0 30px rgba(255, 193, 7, 0.1),
              inset 0 1px 1px rgba(255, 255, 255, 0.1);
            overflow: hidden;
            transform: perspective(1000px);
          }
          
          /* Glowing header border */
          .modal-content::before {
            content: '';
            position: absolute;
            top: 0;
            left: 20%;
            right: 20%;
            height: 2px;
            background: linear-gradient(90deg, 
              rgba(255, 193, 7, 0), 
              rgba(255, 193, 7, 1), 
              rgba(255, 193, 7, 0));
            filter: blur(1px);
          }
          
          /* Header styling */
          .modal-header {
            background: linear-gradient(to bottom, #252525, #1c1c1c);
            border-bottom: 1px solid rgba(255, 193, 7, 0.2);
            padding: 1.25rem 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
          }
          
          .modal-title {
            color: #ffc107;
            font-size: 1.5rem;
            font-weight: 700;
            text-shadow: 0 0 10px rgba(255, 193, 7, 0.3);
            margin: 0;
            font-family: 'Montserrat', sans-serif;
            letter-spacing: 0.5px;
          }
          
          .btn-close {
            background: transparent;
            border: none;
            width: 32px;
            height: 32px;
            opacity: 0.8;
            transition: all 0.2s;
            border-radius: 6px;
            position: relative;
            cursor: pointer;
          }
          
          .btn-close:hover {
            opacity: 1;
            background: rgba(255, 193, 7, 0.1);
            transform: rotate(90deg);
          }
          
          /* Body styling */
          .modal-body {
            padding: 1.75rem;
            background: #141414;
            position: relative;
          }

          /* Form elements */
          .form-group {
            margin-bottom: 1.5rem;
            position: relative;
          }
          
          .form-label {
            display: block;
            color: #ffc107;
            font-weight: 600;
            font-size: 0.95rem;
            margin-bottom: 0.75rem;
            letter-spacing: 0.5px;
          }
          
          .form-control {
            display: block;
            width: 100%;
            padding: 0.75rem 1rem;
            font-size: 1rem;
            line-height: 1.5;
            color: #f8f9fa;
            background-color: rgba(55, 55, 55, 0.4);
            background-clip: padding-box;
            border: 1px solid #444;
            border-radius: 8px;
            transition: all 0.2s ease-in-out;
          }
          
          .form-control:focus {
            color: #fff;
            background-color: rgba(55, 55, 55, 0.6);
            border-color: rgba(255, 193, 7, 0.5);
            outline: 0;
            box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.25);
          }
          
          /* Specific input styling */
          input[type="number"] {
            -moz-appearance: textfield;
            appearance: textfield;
          }
          
          input[type="number"]::-webkit-outer-spin-button,
          input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          
          .rating-container {
            position: relative;
          }
          
          .rating-slider-container {
            display: flex;
            align-items: center;
            gap: 1rem;
          }
          
          .rating-slider {
            flex-grow: 1;
            height: 6px;
            -webkit-appearance: none;
            background: linear-gradient(to right, #ffc107 0%, #ffc107 50%, #444 50%, #444 100%);
            border-radius: 10px;
            outline: none;
          }
          
          .rating-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: #ffc107;
            cursor: pointer;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
          }
          
          .rating-slider::-moz-range-thumb {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: #ffc107;
            cursor: pointer;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
            border: none;
          }
          
          .rating-value {
            min-width: 60px;
            text-align: center;
            font-size: 1.5rem;
            font-weight: 700;
            color: #ffc107;
            line-height: 1;
            text-shadow: 0 0 5px rgba(255, 193, 7, 0.3);
          }
          
          .rating-stars {
            display: flex;
            margin-top: 0.25rem;
            justify-content: space-between;
            padding: 0 12px;
          }
          
          .rating-star {
            font-size: 0.75rem;
            color: #555;
          }
          
          .rating-star.active {
            color: #ffc107;
          }
          
          textarea.form-control {
            min-height: 120px;
            resize: vertical;
          }
          
          /* Button styling */
          .modal-footer {
            display: flex;
            justify-content: flex-end;
            padding: 1.25rem 1.5rem;
            background: #0f0f0f;
            border-top: 1px solid rgba(255, 193, 7, 0.1);
            gap: 0.5rem;
          }
          
          .btn {
            padding: 0.6rem 1.5rem;
            font-weight: 600;
            letter-spacing: 0.5px;
            border-radius: 8px;
            transition: all 0.3s;
            cursor: pointer;
            font-size: 0.95rem;
            text-transform: uppercase;
          }
          
          .btn-danger {
            color: #fff;
            background-color: transparent;
            border: 1px solid rgba(220, 53, 69, 0.5);
            color: #dc3545;
          }
          
          .btn-danger:hover {
            background-color: rgba(220, 53, 69, 0.1);
            border-color: rgba(220, 53, 69, 0.8);
            box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.2);
          }
          
          .btn-warning {
            background: linear-gradient(135deg, #ffc107, #ff9800);
            color: #000;
            border: none;
            box-shadow: 0 4px 10px rgba(255, 152, 0, 0.3);
          }
          
          .btn-warning:hover {
            background: linear-gradient(135deg, #ffca2c, #ffad33);
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(255, 152, 0, 0.4);
          }
          
          .btn-warning:active {
            transform: translateY(1px);
          }
          
          /* Animations */
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideDown {
            from { 
              opacity: 0;
              transform: translateY(-30px) scale(0.97); 
            }
            to { 
              opacity: 1;
              transform: translateY(0) scale(1); 
            }
          }
          
          /* Floating labels effect */
          .form-floating {
            position: relative;
          }
          
          .form-floating label {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            padding: 1rem .75rem;
            pointer-events: none;
            border: 1px solid transparent;
            transform-origin: 0 0;
            transition: opacity .1s ease-in-out, transform .1s ease-in-out;
            color: #999;
          }
          
          .form-floating input:focus ~ label,
          .form-floating input:not(:placeholder-shown) ~ label {
            opacity: .65;
            transform: scale(.85) translateY(-.5rem) translateX(.15rem);
            background: #212529;
            padding: 0 .5rem;
            height: auto;
          }
        `}
          </style>

          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Review</h5>
                <button
                  type="button"
                  className="btn-close"
                  style={{
                    filter:
                      "invert(25%) sepia(100%) saturate(10000%) hue-rotate(0deg)",
                  }}
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <path
                      d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>

              <div className="modal-body">
                <form id="reviewForm" onSubmit={handleAddReview}>
                  <div className="form-group">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      placeholder="What's your headline?"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Rating (0 - 10)</label>
                    <div className="rating-container">
                      <div className="rating-slider-container">
                        <input
                          type="range"
                          className="rating-slider"
                          min="0"
                          max="10"
                          step="1"
                          defaultValue="5"
                          name="rating"
                          id="ratingSlider"
                          onChange={(e) => {
                            const val = e.target.value;
                            e.target.style.background = `linear-gradient(to right, #ffc107 0%, #ffc107 ${
                              val * 10
                            }%, #444 ${val * 10}%, #444 100%)`;
                            document.getElementById("ratingValue").textContent =
                              val;
                            const stars =
                              document.querySelectorAll(".rating-star");
                            stars.forEach((star, i) => {
                              if (i < val) {
                                star.classList.add("active");
                              } else {
                                star.classList.remove("active");
                              }
                            });
                          }}
                          required
                        />
                        <div className="rating-value" id="ratingValue">
                          5
                        </div>
                      </div>

                      <div className="rating-stars">
                        {[...Array(10)].map((_, i) => (
                          <div
                            key={i}
                            className={`rating-star ${i < 5 ? "active" : ""}`}
                          >
                            ★
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Review</label>
                    <textarea
                      className="form-control"
                      name="content"
                      rows="4"
                      placeholder="Share your thoughts about this movie..."
                      required
                    ></textarea>
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="reviewForm"
                  className="btn btn-warning"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
