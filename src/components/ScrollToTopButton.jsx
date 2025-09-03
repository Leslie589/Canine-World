import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTopButton() {
  const [show, setShow] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      setShow(scrollTop + windowHeight >= docHeight - 100);
    };

    // Al cambiar la ruta, verificamos el scroll inmediatamente
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]); // Dependencia: se ejecuta cuando la ruta cambia

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      title="Ir arriba"
      className="btn btn-success scroll-to-top"
      style={{
        position: "fixed",
        bottom: "105px",
        right: "30px",
        zIndex: 1000,
        opacity: show ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      ↑
    </button>
  );
}
