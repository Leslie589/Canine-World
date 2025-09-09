
import React from 'react';
import "../styles.css"; 
import perdido3 from '../images/perdido3.jpg'
import perdido1 from '../images/perdido1.jpg'
import perdido2 from '../images/perdido2.jpg'


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
    features: 'Red collar, very friendly',
    status: 'Searching',
    image: perdido1,
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
    features: 'Was wearing a pink sweater',
    status: 'Searching',
    image: perdido2,
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
    features: 'Very playful, wears a blue collar',
    status: 'Searching',
    image: perdido3,
    comments: '',
  },
];

export default function LostDogs() {
  return (
    <>
 
      <div className="container mb-5">
        <h1 className="text-center mb-5">🐶 Lost Dogs</h1>

        {lostDogs.map((dog) => (
          <div key={dog.id} className="card mb-4 shadow-sm p-3">
  <div className="row g-3 align-items-stretch">
              <div className="col-md-5">
                <img
                  src={dog.image}
                  alt={`dog img ${dog.name}`}
                  className=" rounded perro-img"/>
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
                 <p><strong>Contact:</strong> {dog.contact}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </>
  );
}
