import { useEffect, useState } from "react";
import TopTenSlider from "../components/TopTenSection/TopTenSlider";
import UpNextSection from "../components/UpNextSection/UpNextSection";
import WhatToWatch from "../components/WhatToWatch/WhatToWatch";
import FanFavorites from "../components/FanFavorites/FanFavorites";
import { SpotlightSection } from "./../components/SpotlightSection/SpotlightSection";
import { PopularCelebrities } from "./../components/PopularCelebrities/PopularCelebrities";
import TopNews from "./../components/TopNews/TopNews";
import { getAllMovies } from "../API/movieAPI";
import Spinner from "../components/Spinner/Spinner";
const Home = () => {
  const [topTenMovies, setTopTenMovies] = useState([]);
  const [whatToWatchMovies, setWhatToWatchMovies] = useState([]);
  const [fanFavorites, setFanFavorites] = useState([]);
  const [upNextMovies, setUpNextMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getAllMovies();
        if (response.data) {
          const allMovies = [...response.data];
          setUpNextMovies(allMovies.slice(40,55));
          setTopTenMovies(
            allMovies.slice(0, 10).filter(movie => movie.category === "topTen")
          );
          setFanFavorites(
            allMovies.slice(230, 240).filter(movie => movie.category === "favorite")
          );
          setWhatToWatchMovies(
            allMovies.slice(100, 150).filter(movie => movie.category === "toWatch")
          );
        }
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setError("Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      {isLoading && <Spinner load="Loading Content..." />}
      
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <UpNextSection upNextMovies={upNextMovies} />
          <SpotlightSection />
          <PopularCelebrities />
          <TopTenSlider movies={topTenMovies} />
          <FanFavorites movies={fanFavorites} />
          <WhatToWatch movies={whatToWatchMovies} />
          <TopNews />
        </>
      )}
    </>
  );
};

export default Home;