import React, { useState, useEffect, useRef } from "react";
import "./NavBar.css";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getAllMovies } from "../../API/movieAPI";

export default function Navbar() {
  const options = [
    {
      icon: <i className="search-icon-out bi bi-search"></i>,
      title: "all",
    },
    {
      icon: <i className="search-icon-out bi bi-mask"></i>,
      title: "drama",
    },
    {
      icon: <i className="search-icon-out bi bi-fire"></i>,
      title: "action",
    },
    {
      icon: <i className="search-icon-out bi bi-emoji-laughing"></i>,
      title: "comedy",
    },
    {
      icon: <i className="search-icon-out bi bi-compass"></i>,
      title: "adventure",
    },
    {
      icon: <i className="search-icon-out bi bi-lightning-charge"></i>,
      title: "thriller",
    },
    {
      icon: <i className="search-icon-out bi bi-controller"></i>,
      title: "animation",
    },
    {
      icon: <i className="search-icon-out bi bi-emoji-dizzy-fill"></i>,
      title: "horror",
    },
    {
      icon: <i className="search-icon-out bi bi-question-octagon"></i>,
      title: "mystery",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchMovies, setSearchMovies] = useState([]);
  const [selectedValue, setSelectedValue] = useState("all");
  const mobileMenuRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const navigate = useNavigate();
  useEffect(() => {
    getAllMovies().then((res) => {
      setSearchMovies(res.data);
    });
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelectedValue(option);
    setIsOpen(false);
  };

  const [searchText, setSearchText] = useState("");
  const filteredData = searchMovies.filter((item) => {
    const matchesCategory =
      selectedValue === "all" ||
      item.Genre.toLowerCase().includes(selectedValue);
    const matchesSearch = item.Title.toLowerCase().includes(
      searchText.toLowerCase()
    );
    return matchesCategory && matchesSearch;
  });
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchText(""); 
      }
    };

    if (searchText) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchText]);

  return (
    <>
      <div className="navbar-container">
        <Container>
          <nav className="navbar">
            <Link to="/" className="navbar-logo text-decoration-none">
              <img src="../../assets/imgs/cinemania.png" alt="CineMania" loading="lazy" />
            </Link>

            <div className="menu-button" onClick={toggleMobileMenu}>
              <div className="menu-icon">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="menu-text">Menu</span>
            </div>

            <div className="search-container">
              <div
                ref={dropdownRef}
                style={{ position: "relative", width: "auto" }}
              >
                <div
                  className="seacrh-drop"
                  onClick={toggleDropdown}
                  style={{
                    padding: "5px 20px",
                    background: "white",
                    cursor: "pointer",
                    border: "none ",
                    color: "black",
                    fontSize: "15px",
                    textTransform: "capitalize",
                    borderTopLeftRadius: "6px",
                    borderBottomLeftRadius: "6px",
                  }}
                >
                  {selectedValue}
                  <i
                    style={{
                      color: "#949494",
                      fontSize: "13px",
                      marginLeft: "5px",
                    }}
                    className="bi bi-caret-down-fill"
                  ></i>
                </div>

                {isOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      width: "250px",
                      backgroundColor: "#1f1f1f",
                      zIndex: 10,
                      padding: "8px 0px",
                      borderBottomRightRadius: "10px",
                      borderBottomLeftRadius: "10px",
                    }}
                  >
                    {options.map((option, index) => (
                      <div
                        className="seacrh-drop-out"
                        key={index}
                        onClick={() => handleSelect(option.title)}
                        style={{
                          padding: "15px 15px",
                          cursor: "pointer",
                          fontSize: "19px",
                          textTransform: "capitalize",
                        }}
                      >
                        {option.icon} {option.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="search-input">
                <input
                  type="text"
                  placeholder="Search CineMania"
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button className="search-button">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>

            <div className="menu-items">
              <Link className="text-decoration-none text-light" to={`/movies`}>
                <span className="py-2">
                  <i className="bi bi-film"></i>
                  movies
                </span>
              </Link>
              <Link
                className="text-decoration-none text-light"
                to={`/popular-celebrities`}
              >
                <span className="py-2">
                  <i className="bi bi-person-video"></i> actors
                </span>
              </Link>
              <Link
                className="text-decoration-none text-light"
                to={`/trailers`}
              >
                <span className="py-2">
                  <i className="bi bi-play-circle"></i> trailers
                </span>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="mobile-menu-overlay">
              <div className="mobile-menu" ref={mobileMenuRef}>
                <div className="mobile-menu-header">
                  <Link to="/" className="text-decoration-none">
                    <img
                      src="../../assets/imgs/cinemania.png"
                      alt="CineMania"
                      loading="lazy"
                    />
                  </Link>
                  <button className="close-button" onClick={toggleMobileMenu}>
                    ✕
                  </button>
                </div>
              <ul className="mobile-menu-items px-0">
                                  <div
                    className="text-decoration-none text-light"
                    onClick={() => {
                      navigate(`/movies`);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <li>
                      <i className="bi bi-film me-2"></i> Movies
                    </li>
                  </div>


                  <div
                    className="text-decoration-none text-light"
                    onClick={() => {
                      navigate(`/popular-celebrities`);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <li>
                      <i className="bi bi-person-video3 me-2"></i> Actors
                    </li>
                  </div>

                  <div
                    className="text-decoration-none text-light"
                    onClick={() => {
                      navigate(`/trailers`);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <li>
                      <i className="bi bi-camera-reels me-2"></i> Trailers
                    </li>
                  </div>

                                  <div
                    className="text-decoration-none text-light"
                    onClick={() => {
                      navigate(`/movies/top-ten`);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                       <li>
                      <i className="bi bi-graph-up-arrow me-2"></i> Top Ten
                    </li> 
                  </div>

                  <div
                    className="text-decoration-none text-light"
                    onClick={() => {
                      navigate(`/movies/favorites`);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <li>
                      <i className="bi bi-heart-fill me-2"></i> Favorites
                    </li>
                  </div>

                  <div
                    className="text-decoration-none text-light"
                    onClick={() => {
                      navigate(`/movies/top-picks`);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <li>
                      <i className="bi bi-star-fill me-2"></i> Top Picks
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          )}
        </Container>
      </div>

      {searchText && (
        <div ref={searchRef} className="navbar-container1">
          <Container>
            <nav className="navbar">
              <Link
                to="/"
                className="navbar-logo navbar-logo1 text-decoration-none opacity-0"
              >
                <img src="../../assets/imgs/cinemania.png" alt="CineMania" loading="lazy" />
              </Link>
              <div
                className="menu-button menu-button1 opacity-0"
                onClick={toggleMobileMenu}
              >
                <div className="menu-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="menu-text">Menu</span>
              </div>

              <div className="search-container1">
                {filteredData.map((item, index) => (
                  <div
                    onClick={() => {
                      navigate(`/movie/${item.id}`);
                      setSearchText("");
                    }}
                    className="search-output"
                    key={index}
                  >
                    <img src={item?.Poster} draggable="false" loading="lazy" />
                    <div className="out1">
                      <h5>{item?.Title}</h5>
                      <p>{item?.Year}</p>
                      <p>{item?.Genre?.split(",").join(" . ")}</p>
                    </div>
                  </div>
                ))}
                {filteredData.length === 0 && (
                  <div
                    style={{ marginTop: "0px", width: "100%", border: "none" }}
                    className="celebrities-no-results"
                  >
                    <i className="bi bi-emoji-tear-fill"></i>
                    <p>No movies found matching your search.</p>
                  </div>
                )}
              </div>
              <div className="menu-items opacity-0">
                <span>
                  <i className="bi bi-film"></i>
                  movies
                </span>
                <span>
                  <i className="bi bi-person-video"></i> actors
                </span>
                <span>
                  <i className="bi bi-play-circle"></i> trailers
                </span>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </>
  );
}
