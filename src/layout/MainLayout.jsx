import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SharedLayout from "./SharedLayout";
import Home from "../pages/Home";
import NotFound from "../components/NotFound/NotFound";
import Movie from "../pages/Movie";
import Trailer from "../components/Trailer/Trailer";
import ActorPage from "../components/ActorPage/ActorPage";
import UserReviews from "../pages/UserReviews";
import FanFavoritesDetails from "../components/FanFavoritesDetails/FanFavoritesDetails";
import WhatToWatchDetails from "../components/WhatToWatchDetails/WhatToWatchDetails";
import TopTenSectionDetails from "../components/TopTenSectionDetails/TopTenSectionDetails";
import Trailers from "../pages/Trailers";
import Actors from "../pages/Actors";
import Movies from "../pages/Movies";


const MainLayout = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/movie/:id/reviews" element={<UserReviews />} />
          <Route path="/trailer/:id" element={<Trailer />} />
          <Route path="/trailers" element={<Trailers />} />
          <Route path="/actor/:id" element={<ActorPage />} />
          <Route path="/movies/favorites" element={<FanFavoritesDetails />} />
          <Route path="/movies/top-picks" element={<WhatToWatchDetails />} />
          <Route path="/movies/top-ten" element={<TopTenSectionDetails />} />
          <Route path="/movies" element={<Movies />} />
          <Route
            path="/popular-celebrities"
            element={<Actors />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainLayout;
