import React from 'react'
import "../styles.css";
import logo from "../images/logo.jpg"

export default function About() {
  return (
    <>


      <div className="container col-md-12 my-4">
        <div className="row justify-content-center">
          {/* Imagen logo */}
          <div className="col-md-4 my-4 mt-4">
            <img
              src={logo}
              alt="logo"
              className="w-100"
              height="480"
            />
          </div>

          {/* Texto descriptivo */}
          <div className="col-md-8">
            <h1 className="display-4 fw-bold text-black about-title">
              About Canine World!
            </h1>

<p className="lead my-4 about-text">
  Canine World is a personal project that uses The Dog API to provide accurate and detailed information about a wide variety of dog breeds.
</p>

<p className="lead about-text">
  The <strong>Breed Explorer</strong> offers detailed descriptions, images, temperament, size, lifespan, and unique traits of each breed to help you make informed choices.
</p>

<p className="lead about-text">
  The <strong>Lost Dogs</strong> section helps find missing pets.
</p>

<p className="lead about-text">
  The <strong>Adoption</strong> section showcases dogs available for adoption, those already adopted, and recently found dogs, using up-to-date information from the Petfinder API to help connect pets with loving homes.
</p>

<h5 className="display-7  mt-5 fw-bold lh-4 about-thanks">
  Thank you for visiting! Enjoy exploring the wonderful world of dogs.
</h5>
      </div>
        </div>
        <br />
      </div>


    </>
  )
}
