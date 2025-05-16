import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ActorPage.css";
import { getPopularActorById } from "../../API/actorAPI";
import { useNavigate, useParams } from "react-router-dom";
import KnownForSection from "../KnownForSection/KnownForSection";
import SectionHeader from "../../shared/heading/SectionHeader";
import { getAllMovies } from "../../API/movieAPI";
import Spinner from "../Spinner/Spinner";
export default function ActorPage() {
  const { id } = useParams();
  const [showFullBio, setShowFullBio] = useState(false);
  const [actorDetails, setActorDetails] = useState({});
  const [actorTrailers, setActorTrailers] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const actorRes = await getPopularActorById(id);
        setActorDetails(actorRes.data);

        const allMoviesRes = await getAllMovies();
        setActorTrailers(
          allMoviesRes.data.filter((movie) =>
            movie.Actors?.toLowerCase().includes(
              actorRes.data?.name?.toLowerCase()
            )
          )
        );
      } catch (error) {
        console.error("Error fetching actor data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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

  if (loading) return <Spinner load="Loading Actor..." />;
  return (
    <>
      <div style={{ backgroundColor: "#181818" }}>
        <div
          className="container container-fluid mt-5 mb-5 text-white py-4"
          style={{
            position: "relative",
            minHeight: "100vh",
            overflow: "hidden",
            backgroundColor: "#181818",
          }}
        >
          {actorDetails.profile_path && (
            <div
              className="mt-5 mb-5 container-fluid"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "400px",
                backgroundImage: `url(https://media.themoviedb.org/t/p/original/${actorDetails.profile_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center top",
                filter: "blur(5px)",
                opacity: 0.6,
                zIndex: 0,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    "linear-gradient(to bottom, rgba(24,24,24,0.4) 0%, rgba(24,24,24,1) 100%)",
                  zIndex: 1,
                }}
              />
            </div>
          )}

          <div
            className="container"
            style={{
              position: "relative",
              zIndex: 2,
            }}
          >
            <Row>
              <Col>
                <h1>{actorDetails.name}</h1>
                <p
                  style={{
                    fontSize: "20px",
                    color: "rgba(201, 201, 200, 0.846)",
                    fontWeight: "600",
                  }}
                >
                  {actorDetails.gender != 1 ? "Actor" : "Actress"}
                  <span className="text-success ms-5">
                    <i className="text-success me-1 bi bi-graph-up-arrow"></i>
                    <span style={{ color: "rgba(201, 201, 200, 0.846)" }}>
                      {actorDetails.popularity}
                    </span>
                  </span>
                </p>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={3}>
                <img
                  loading="lazy"
                  src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${actorDetails.profile_path}`}
                  alt={actorDetails?.name}
                  className="img-fluid rounded mb-3"
                />
              </Col>

              <Col md={7}>
                <div className="trailer-container position-relative rounded overflow-hidden">
                  {actorTrailers[0]?.trailers[0]?.trailerLink ? (
                    <>
                      <iframe
                        width="100%"
                        height="100%"
                        src={actorTrailers[0]?.trailers[0]?.trailerLink}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </>
                  ) : (
                    <div className="trailer-placeholder">
                      <i className="bi bi-film"></i>
                    </div>
                  )}

                  <div className="trailer-stats">
                    <div>
                      <i className="bi bi-hand-thumbs-up me-1"></i> 81
                    </div>
                    <div>
                      <i className="bi bi-heart-fill text-danger me-1"></i> 52
                    </div>
                  </div>
                </div>
              </Col>

              <Col
                md={2}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  padding: "0px 7px",
                }}
              >
                <div
                  className="card text-white card-vedio-actor bg-secondary bg-gradient bg-opacity-10"
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    onClick={() => navigate(`/trailer/${actorTrailers[0]?.id}`)}
                    className="text-center"
                  >
                    <i className="bi bi-film fs-4 icon-vediooo"></i>
                    <h5 className="mt-2 fs-6 fw-bold text-vediooo">
                      {actorTrailers[0]?.trailers?.length} VIDEOS
                    </h5>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col md={8}>
                <SectionHeader title={"Overview"} />
                <div className="ms-3">
                  <div className="container w-100 ms-0">
                    <div className="border-top border-secondary py-2 d-flex justify-content-between align-items-center">
                      <div>
                        <strong className="text-light me-2">Born</strong>{" "}
                        <span
                          className="text-details"
                          style={{ fontWeight: "600" }}
                        >
                          {actorDetails?.birthday}{" "}
                          <span className="mx-1">.</span>{" "}
                          {actorDetails?.place_of_birth}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="container  w-100 ms-0">
                    <div className="border-top border-secondary py-2 d-flex justify-content-between align-items-center">
                      <div>
                        <strong className="text-light  me-2">Birth name</strong>{" "}
                        <span
                          className="text-details"
                          style={{ fontWeight: "600" }}
                        >
                          {actorDetails.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="container  w-100 ms-0">
                    <div className="border-top border-secondary py-2 d-flex justify-content-between align-items-center">
                      <div>
                        <strong className="text-light  me-2">Nickname</strong>{" "}
                        <span
                          className="text-details"
                          style={{ fontWeight: "600" }}
                        >
                          {actorDetails?.nickname}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="container w-100 ms-0">
                    <div className="border-top border-secondary py-2">
                      <div>
                        <strong className="text-light me-2">Biography</strong>{" "}
                        <div
                          className="text-details mt-2"
                          style={{ fontWeight: "500" }}
                        >
                          {showFullBio || !actorDetails?.biography
                            ? actorDetails?.biography
                            : `${actorDetails?.biography?.substring(
                                0,
                                350
                              )}...`}

                          {actorDetails?.biography?.length > 350 && (
                            <span
                              className="p-0 ms-2 text-light"
                              onClick={() => setShowFullBio(!showFullBio)}
                              style={{
                                cursor: "pointer",
                                textDecoration: "none",
                                fontSize: "0.9rem",
                                fontWeight: "600",
                              }}
                            >
                              {showFullBio ? (
                                <>
                                  <i className="bi bi-chevron-up me-1"></i>Show
                                  Less
                                </>
                              ) : (
                                <>
                                  <i className="bi bi-chevron-down me-1"></i>
                                  Read More
                                </>
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <KnownForSection
            topMovies={actorDetails?.top_movies}
            actorTrailers={actorTrailers}
          />
        </div>
      </div>
    </>
  );
}
