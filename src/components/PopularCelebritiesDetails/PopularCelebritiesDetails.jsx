import { useEffect, useState } from "react";
import {
  Container,
  Form,
  InputGroup,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Tooltip,
  ButtonGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { getPopularActors } from "../../API/actorAPI";
import "./PopularCelebritiesDetails.css";
import KnownForSection from "../KnownForSection/KnownForSection";
import Spinner from "../Spinner/Spinner";

const FALLBACK_AVATAR =
  "https://ui-avatars.com/api/?name=Celebrity&background=444444&color=fff&size=256";

export default function PopularCelebritiesDetails() {
  const [celebrities, setCelebrities] = useState([]);
  const [filteredCelebrities, setFilteredCelebrities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [department, setDepartment] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const fetchCelebrities = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getPopularActors();
        setCelebrities(response.data);
        setFilteredCelebrities(response.data);
      } catch (err) {
        console.error("Error fetching celebrities:", err);
        setError("Failed to load celebrities. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCelebrities();
  }, []);

  useEffect(() => {
    let filtered = celebrities.filter((celebrity) =>
      celebrity.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (department !== "all") {
      filtered = filtered.filter(
        (celebrity) =>
          celebrity.known_for_department?.toLowerCase() ===
          department.toLowerCase()
      );
    }
    filtered.sort((a, b) => {
      if (sortBy === "popularity") {
        return b.popularity - a.popularity;
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    setFilteredCelebrities(filtered);
  }, [searchTerm, celebrities, sortBy, department]);

  const handleClearSearch = () => setSearchTerm("");

  const renderSkeletonCards = () => {
    return Array(12)
      .fill(null)
      .map((_, index) => (
        <Col key={index} xs={6} sm={4} md={3} lg={2} xl={2}>
          <div className="celebrity-card skeleton">
            <div className="image-container">
              <div className="skeleton-image"></div>
            </div>
            <div className="celebrity-info">
              <div className="skeleton-text"></div>
              <div className="skeleton-text"></div>
            </div>
          </div>
        </Col>
      ));
  };

  return (
    <div className="container">
      {isLoading ? (
          <Spinner load="Loading Celebrities..." />
      ) : error ? (
          <div className="alert alert-danger text-center">
            {error}
            <button
              className="btn btn-warning ms-3"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
      ) : (
        <>
          <Container fluid className="py-5 mt-5">
            <h1 className="celebrities-header-title">Cinemania Celebrities</h1>
            <div
              style={{
                width: 80,
                height: 6,
                background: "#f5c518",
                borderRadius: 3,
                marginBottom: 32,
              }}
            />
            <div className="celebrities-header-section px-5">
              <Container>
                <div className="celebrities-filters-container mt-5">
                  <div className="filter-section">
                    <h6 className="filter-label text-light">Sort By</h6>
                    <ButtonGroup className="filter-buttons">
                      <Button
                        variant={
                          sortBy === "popularity" ? "warning" : "outline-secondary"
                        }
                        onClick={() => setSortBy("popularity")}
                        className="filter-button"
                      >
                        <i className="bi bi-fire me-1"></i> Popularity
                      </Button>
                      <Button
                        variant={
                          sortBy === "name" ? "warning" : "outline-secondary"
                        }
                        onClick={() => setSortBy("name")}
                        className="filter-button"
                      >
                        <i className="bi bi-sort-alpha-down me-1"></i> Alphabetical
                      </Button>
                    </ButtonGroup>
                  </div>

                  <div className="filter-section">
                    <h6 className="filter-label text-light">Department</h6>
                    <ButtonGroup className="filter-buttons">
                      <Button
                        variant={
                          department === "all" ? "warning" : "outline-secondary"
                        }
                        onClick={() => setDepartment("all")}
                        className="filter-button"
                      >
                        All
                      </Button>
                      <Button
                        variant={
                          department === "acting" ? "warning" : "outline-secondary"
                        }
                        onClick={() => setDepartment("acting")}
                        className="filter-button"
                      >
                        Acting
                      </Button>
                      <Button
                        variant={
                          department === "directing"
                            ? "warning"
                            : "outline-secondary"
                        }
                        onClick={() => setDepartment("directing")}
                        className="filter-button"
                      >
                        Directing
                      </Button>
                      <Button
                        variant={
                          department === "production"
                            ? "warning"
                            : "outline-secondary"
                        }
                        onClick={() => setDepartment("production")}
                        className="filter-button"
                      >
                        Production
                      </Button>
                      <Button
                        variant={
                          department === "writing" ? "warning" : "outline-secondary"
                        }
                        onClick={() => setDepartment("writing")}
                        className="filter-button"
                      >
                        Writing
                      </Button>
                    </ButtonGroup>
                  </div>
                  <div className="celebrities-search-container mt-4">
                    <InputGroup
                      className={`search-bar-wrapper ${
                        isSearchFocused ? "focused" : ""
                      }`}
                    >
                      <InputGroup.Text className="search-icon">
                        <i className="bi bi-search"></i>
                      </InputGroup.Text>
                      <Form.Control
                        id="celebrities-search-input"
                        type="text"
                        placeholder="Search celebrities..."
                        aria-label="Search celebrities"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                        autoComplete="off"
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        style={{ backgroundColor: "#121212", color: "#fff" }}
                      />
                      {searchTerm && (
                        <Button
                          variant="link"
                          className="search-clear-btn"
                          onClick={handleClearSearch}
                          tabIndex={0}
                          aria-label="Clear search"
                        >
                          <i className="bi bi-x-lg"></i>
                        </Button>
                      )}
                    </InputGroup>
                  </div>
                </div>
              </Container>
            </div>

            <Container>
              <Row className="g-4">
                {filteredCelebrities.map((celebrity) => {
                  const knownForList =
                    celebrity.known_for && celebrity.known_for.length > 0
                      ? celebrity.known_for
                          .map((work) => work.title || work.name)
                          .join(", ")
                      : null;
                  return (
                    <Col key={celebrity.id} xs={6} sm={4} md={3} lg={2} xl={2}>
                      <div className="celebrity-card">
                        <Link
                          to={`/actor/${celebrity.id}`}
                          className="celebrities-image-container"
                          tabIndex={0}
                        >
                          <img
                            src={
                              celebrity.profile_path
                                ? `https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${celebrity.profile_path}`
                                : FALLBACK_AVATAR
                            }
                            alt={celebrity.name}
                            className="celebrities-image fade-in"
                            loading="lazy"
                            onError={(e) => (e.target.src = FALLBACK_AVATAR)}
                          />
                          <div className="celebrities-image-gradient"></div>
                          {celebrity.popularity &&
                            !isNaN(celebrity.popularity) && (
                              <div className="celebrities-popularity-badge">
                                <i className="bi bi-star-fill me-1"></i>
                                <span>
                                  {Math.round(celebrity.popularity * 10) / 10}
                                </span>
                              </div>
                            )}
                          <span className="celebrities-view-profile">
                            View Profile
                          </span>
                        </Link>
                        <div className="celebrity-info">
                          <h3 className="celebrity-name">{celebrity.name}</h3>
                          <div className="celebrities-divider"></div>
                          <p className="celebrity-known-for">
                            {celebrity.known_for_department || "Actor"}
                          </p>
                          {knownForList && (
                            <OverlayTrigger
                              placement="top"
                              overlay={<Tooltip>{knownForList}</Tooltip>}
                            >
                              <p className="known-for-works">
                                Known for:{" "}
                                {knownForList.length > 40
                                  ? knownForList.slice(0, 40) + "..."
                                  : knownForList}
                              </p>
                            </OverlayTrigger>
                          )}
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>

              {filteredCelebrities.length === 0 && (
                <div className="celebrities-no-results">
                  <i className="bi bi-emoji-frown"></i>
                  <p>No celebrities found matching your search.</p>
                </div>
              )}
            </Container>
          </Container>
          <KnownForSection />
        </>
      )}
    </div>
  );
}