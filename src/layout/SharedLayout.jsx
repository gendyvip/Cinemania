
import Navbar from "../components/Navbar/Navbar";
import Footer from "./../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import BackToTopButton from '../components/BackToTopButton/BackToTopButton';


const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    <BackToTopButton/>
    </>
  );
};

export default SharedLayout;