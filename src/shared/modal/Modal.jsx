import { Link } from "react-router-dom";
import "./Modal.css";
const Modal = ({whatToWatchDetails}) => {
  return (
  <>
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered border-secondary">
        <div className="modal-dialog modal-dialog-centered border-secondary">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{
                backgroundColor: "var(--cinemania-dark-gray)",
                color: "var(--cinemania-white)",
                border: "1px solid var(--cinemania-medium-gray)",
              }}
            >
              <button
                type="button"
                className="bg-light me-3 my-3 btn-close position-absolute top-0 end-0"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
              <div className="card-body">
                <div className="d-flex gap-3">
                  <Link to="">
                    <img
                      src={whatToWatchDetails?.poster_path}
                      alt="The Amateur movie poster"
                      style={{
                        borderRadius: "10px",
                        objectFit: "contain",
                        width: "100px",
                        height: "150px",
                      }}
                    />
                  </Link>
                  <div className="modal-body-details">
                    <Link
                      to={`/movie/${whatToWatchDetails?.id}`}
                      className="card-title-hover text-decoration-none"
                    >
                      <h4
                        className="card-title  mb-2 fs-6"
                        style={{ color: "var(--cinemania-white)" }}
                      >
                        {whatToWatchDetails?.title}{" "}
                        <i className="chev-right bi bi-chevron-right"></i>
                      </h4>
                      <h3>{}</h3>
                    </Link>
                    <div
                      className="mb-2 fs-5"
                      style={{ color: "var(--cinemania-extended-gray)" }}
                    >
                      {whatToWatchDetails?.Year ? whatToWatchDetails?.Year : ""}
                      <br />
                      {whatToWatchDetails?.genres}
                    </div>

                    <span
                      className="me-2 fs-6"
                      style={{ color: "var(--cinemania-yellow)" }}
                    >
                      <i className="bi bi-star-fill"></i>{" "}
                      <span style={{ color: "var(--cinemania-white)" }}>
                        {" "}
                        {whatToWatchDetails?.rating?.toFixed(1)}/10
                      </span>
                    </span>
                  </div>
                </div>
                <p className="card-text my-3">{whatToWatchDetails?.overview}</p>

                <div
                  className="border-top pt-3"
                  style={{ borderColor: "var(--cinemania-medium-gray)" }}
                >
                  <small style={{ color: "var(--cinemania-light-gray)" }}>
                    Details of {whatToWatchDetails?.title}
                    <br />
                    <span style={{ color: "var(--cinemania-yellow)" }}>
                      Production Company: {whatToWatchDetails?.production_companies}
                    </span>
                    <br />
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Modal;
