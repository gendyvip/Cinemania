import { useEffect, useState } from "react";
import "./BackToTopButton.css";
export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div
      className={`inline-back-to-top ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
    >
      <button className="inline-btn">
        <i className="bi bi-arrow-up" style={{ marginRight: "8px" }}></i>
        Back to top
      </button>
    </div>
  );
}
