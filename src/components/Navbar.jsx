
import React from 'react';
import logo from '../images/logo.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import '../styles.css'; 


const Navbar = () => {
  return (
    <header className="navbar-header">
      <nav className="navbar navbar-expand-lg navbar-dark bg-success fixed-top">
        <div className="container-fluid">
          <a href="/" className="navbar-brand d-flex align-items-center">
            <img src={logo} alt="Logo" className="navbar-logo" />
            <span className="navbar-title">Canine World</span>
          </a>

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

          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav ms-auto">
         <a className="nav-link" href="/"> 🏠 Home</a>
    <a className="nav-link" href="/lost-dogs">🚨 Lost Dogs</a>
    <a className="nav-link" href="/breed">🐾 Breed Explorer</a>
     <a className="nav-link" href="/adoption">🐕 Adoption & More</a>
    <a className="nav-link" href="/about">📄 About</a>
  
            </div>
          </div>
        </div>
      </nav>

    </header>
  );
};

export default Navbar;
