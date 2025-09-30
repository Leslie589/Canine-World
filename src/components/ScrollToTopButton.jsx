import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTopButton() {
  const [show, setShow] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShow(false); // Oculta el botón inmediatamente al cambiar de ruta

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      const hasScroll = docHeight > windowHeight;
      setShow(hasScroll && scrollTop > 200);
    };

    handleScroll();
    const timeoutId = setTimeout(handleScroll, 100);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [location]);

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
        opacity: 1,
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      ↑
    </button>
  );
}
