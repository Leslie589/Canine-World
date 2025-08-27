
import React from 'react';
import "../styles.css"; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const lostDogs = [
  {
    id: 1,
    name: 'Firulais',
    breed: 'Labrador',
    age: '3 years',
    color: 'Light brown',
    location: 'Central Park',
    dateLost: '2025-07-10',
    contact: '555-1234',
    contactLink: 'https://wa.me/5551234',
    features: 'Red collar, very friendly',
    status: 'Searching',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYWL8PdrKGvDcibvMPgy4jUU0aiQXdAIG9VQ&s',
    comments: 'Got lost near the main fountain.',
  },
  {
    id: 2,
    name: 'Luna',
    breed: 'Chihuahua',
    age: '1 year',
    color: 'Black with a white belly',
    location: 'Shopping Mall',
    dateLost: '2025-07-15',
    contact: '555-5678',
    contactLink: 'mailto:contact@example.com',
    features: 'Was wearing a pink sweater',
    status: 'Searching',
    image: 'https://previews.123rf.com/images/mirawonderland/mirawonderland1612/mirawonderland161200002/69512191-cute-black-and-white-chihuahua-puppy-waring-a-pink-sweater-facing-the-camera-isolated-on-a-white.jpg',
    comments: 'Last seen near the restaurant area.',
  },
  {
    id: 3,
    name: 'Max',
    breed: 'Golden Retriever',
    age: '4 years',
    color: 'Golden',
    location: 'Main Square',
    dateLost: '2025-07-12',
    contact: '555-9012',
    contactLink: '',
    features: 'Very playful, wears a blue collar',
    status: 'Searching',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRelfZmXVc3a9SVcSWwnj-MNnWMBZ23Aq-rig&s',
    comments: '',
  },
];

export default function LostDogs() {
  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="text-center mb-5">🐶 Lost Dogs</h1>

        {lostDogs.map((dog) => (
          <div key={dog.id} className="card mb-4 shadow-sm p-3">
            <div className="row g-3 align-items-center">
              <div className="col-md-5">
                <img
                  src={dog.image}
                  alt={`dog img ${dog.name}`}
                  className="img-fluid rounded perro-img"/>
              </div>
              <div className="col-md-7">
                <div className="card-body p-0">
                  <h2 className="card-title text-primary">{dog.name}</h2>
                  <p><strong>Breed:</strong> {dog.breed}</p>
                  <p><strong>Age:</strong> {dog.age}</p>
                  <p><strong>Color:</strong> {dog.color}</p>
                  <p><strong>Location:</strong> {dog.location}</p>
                  <p><strong>Date Lost:</strong> {dog.dateLost}</p>
                  <p><strong>Features:</strong> {dog.features}</p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span className={dog.status === 'Searching' ? 'text-danger' : 'text-success'}>
                      {dog.status}
                    </span>
                  </p>
                  {dog.comments && (
                    <p><strong>Comments:</strong> {dog.comments}</p>
                  )}
                  <p>
                    <strong>Contact:</strong>{' '}
                    {dog.contactLink ? (
                      <a href={dog.contactLink} target="_blank" rel="noopener noreferrer">
                        {dog.contact}
                      </a>
                    ) : (
                      dog.contact
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
