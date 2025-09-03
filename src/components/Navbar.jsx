import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
// Cambiado para importar solo Collapse
import Collapse from 'bootstrap/js/dist/collapse';
import '../styles.css';

const Navbar = () => {
  const collapseNavbar = () => {
    const navbar = document.getElementById('navbarNav');
    if (navbar) {
      const bsCollapse = Collapse.getInstance(navbar) || new Collapse(navbar, { toggle: false });
      bsCollapse.hide();
    }
  };

  return (
    <header className="navbar-header">
      <nav className="navbar navbar-expand-lg bg-success fixed-top">
        <div className="container-fluid">
          {/* Logo y título */}
          <Link to="/" className="navbar-brand d-flex align-items-center" onClick={collapseNavbar}>
            <img src={logo} alt="Logo" className="navbar-logo" />
            <span className="navbar-title">Canine World</span>
          </Link>

          {/* Botón para móviles */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Links de navegación */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav ms-auto">
              <Link className="nav-link" to="/" onClick={collapseNavbar}>🏠 Home</Link>
              <Link className="nav-link" to="/lost-dogs" onClick={collapseNavbar}>🚨 Lost Dogs</Link>
              <Link className="nav-link" to="/breed" onClick={collapseNavbar}>🐾 Breed Explorer</Link>
              <Link className="nav-link" to="/adoption" onClick={collapseNavbar}>🐕 Adoption & More</Link>
              <Link className="nav-link" to="/about" onClick={collapseNavbar}>📄 About</Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
