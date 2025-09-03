import React from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../images/logo.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles.css';

const Navbar = () => {
  return (
    <header className="navbar-header">
      <nav className="navbar navbar-expand-lg  bg-success fixed-top">
        <div className="container-fluid">
          {/* Logo y título */}
          <Link to="/" className="navbar-brand d-flex align-items-center">
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
              <Link className="nav-link" to="/">🏠 Home</Link>
              <Link className="nav-link" to="/lost-dogs">🚨 Lost Dogs</Link>
              <Link className="nav-link" to="/breed">🐾 Breed Explorer</Link>
              <Link className="nav-link" to="/adoption">🐕 Adoption & More</Link>
              <Link className="nav-link" to="/about">📄 About</Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
