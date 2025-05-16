import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer mt-5">
      <div className="footer-top">
        <div className="footer-section">
          <h3>Follow Cinemania on social</h3>
          <div className="social-icons">
            <Link to='/' aria-label="Spotify">
              <i className="bi bi-spotify" />
           </Link>
            <Link to='/' aria-label="Instagram">
              <i className="bi bi-instagram" />
           </Link>
            <Link to='/' aria-label="Twitter">
              <i className="bi bi-twitter-x" />
           </Link>
            <Link to='/' aria-label="YouTube">
              <i className="bi bi-youtube" />
           </Link>
            <Link to='/' aria-label="Facebook">
              <i className="bi bi-facebook" />
           </Link>
          </div>
        </div>
        <div className="footer-section foot">
          <div className="foot1">
            <h3>Get the Cinemania app</h3>
            <p>For Android and iOS</p>
          </div>
          <div className="qr-code">
            <img src="../../assets/imgs/qrcode.svg" alt="QR Code for Cinemania App" loading="lazy" />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-links">
          <Link to='/movies'>Movies<i className="bi bi-box-arrow-up-right"></i></Link>
          <Link to='/popular-celebrities'>Actors<i className="bi bi-box-arrow-up-right"></i></Link>
          <Link to='/trailers'>Trailers<i className="bi bi-box-arrow-up-right"></i></Link>
          <Link to='/movies/favorites'>Favorites<i className="bi bi-box-arrow-up-right"></i></Link>
          <Link to='/movies/top-picks'>Top Picks<i className="bi bi-box-arrow-up-right"></i></Link>
        </div>
        <div className="footer-info">
          <p>© 2025 By Cinemania Team</p>
        </div>
      </div>
    </footer>
  );
}
