import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import '../styles.css'; 

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="home container text-center">
        <h1 className="display-4 fw-bold mb-4">Welcome to Canine World</h1>
        <p className="lead text-muted">
          Explore dog breeds, find information, and discover your ideal furry friend.
        </p>
        <img
          src="https://i.pinimg.com/originals/68/89/0a/68890a002716ec49c934abd0bc84e48d.gif"
          alt="Happy dog"
          className="img-fluid my-4"
          style={{ maxWidth: "280px" }}
        />
        <p className="mb-4 ">
          “Explore our menu or use the button to discover all the breeds.”
        </p>
        <Link to="/breed" className="btn btn-warning btn-lg shadow-sm mb-5">
          Explore Breeds
        </Link>

        {/* New section for lost dogs */}
        <div className="perros-perdidos-section p-4 my-5 border rounded shadow-sm bg-light">
          <h2 className="fw-semibold mb-3">Looking for a lost dog?</h2>
          <p className="mb-3">
            Check out our <Link to="/perrosperdidos" className="text-primary text-decoration-underline">Lost Dogs</Link> section to help find your furry friend.
          </p>
          <Link to="/perrosperdidos" className="btn btn-outline-danger">
            Go to Lost Dogs
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
