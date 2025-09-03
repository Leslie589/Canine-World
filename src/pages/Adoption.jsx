import React, { useState } from 'react';

import '../styles.css'; 


export default function Adoption() {
  const [animals, setAnimals] = useState([]);
  const [search, setSearch] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const statusOptions = [
    { label: 'Adoptable', value: 'adoptable', description: 'Animals available for adoption' },
    { label: 'Adopted', value: 'adopted', description: 'Animals that have already been adopted' },
    { label: 'Found', value: 'found', description: 'Animals found and looking for a home' },
  ];

  const handleSearch = async () => {
    if (!status) {
      alert('Please select a status');
      return;
    }

    setSearch(true);
    setHasSearched(true);
    setError(null);

    try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/animals?status=${status}`);

      if (!response.ok) throw new Error('Error fetching data');

      const data = await response.json();
      setAnimals(data.animals || []);
    } catch (err) {
      setError(err.message);
      setAnimals([]);
    } finally {
      setSearch(false);
    }

    
  };
  

  return (
    <>
      <div className="app-container">  {/* Contenedor flex para sticky footer */}

        <main className="main-content"> {/* Crece para empujar el footer */}
          <div className="container my-5">
            <h1 className="text-center mb-3 fw-bold text-black">
              ❤️ Adopt, Find, Save Lives
            </h1>
            <p className="text-center text-muted mb-4">Search animals available by their status</p>

            {/* Filtro de búsqueda */}
            <div className="row justify-content-center mb-4">
              <div className="col-md-5">
                <select
                  className="form-select shadow-sm"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Select a status</option>
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                
              </div>
        
              <div className="col-md-2 mt-3 mt-md-0">
                <button
                  className="btn btn-success w-100 shadow-sm"
                  onClick={handleSearch}
                  disabled={search}
                >
                  {search ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>

            {/* Mensajes de estado */}
            {error && <div className="alert alert-danger text-center">{error}</div>}

            {hasSearched && status && (
              <div className="alert alert-info text-center">
                {statusOptions.find((opt) => opt.value === status)?.description}
              </div>
            )}

            {!search && hasSearched && animals.length === 0 && (
              <p className="text-center text-muted">No animals to display.</p>


              
            )}

            

            {/* Resultados */}

            {search ? (
  <div className="spinner-container">
    <img
      src="https://i.gifer.com/origin/14/14c05fd436b7432d905eaee65475d9a5_w200.gif"
      alt="Loading..."
      className="spinner-img"
    />
  </div>
) : (
            <div className="row g-4">
              {animals.map((animal) => (
                <div className="col-lg-6" key={animal.id}>
                  <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                    <div className="row g-0 h-100">
                      {/* Imagen */}
                      <div className="col-md-5">
                        {animal.photos && animal.photos.length > 0 ? (
                          <img
                            src={animal.photos[0].medium}
                            alt={animal.name}
                            className="img-fluid h-100 w-100 object-fit-fill"
                          />
                        ) : (
                          <div className="bg-secondary text-white d-flex align-items-center justify-content-center h-100">
                            <span className="fw-bold">No image</span>
                          </div>
                        )}
                      </div>

                      {/* Contenido */}
                      <div className="col-md-7 p-4 d-flex flex-column justify-content-between">
                        <div>
                          <h5 className="card-title fw-bold mb-2">{animal.name}</h5>
                          <ul className="list-unstyled small mb-3">
                            <li><strong>Type:</strong> {animal.type}</li>
                            <li><strong>Age:</strong> {animal.age || 'Unknown'}</li>
                            <li><strong>Gender:</strong> {animal.gender || 'Unknown'}</li>
                            <li><strong>Size:</strong> {animal.size || 'Unknown'}</li>
                            <li><strong>Location:</strong> {animal.contact?.address?.city || 'Unknown'}, {animal.contact?.address?.state || ''}</li>
                            <li><strong>Status:</strong> {animal.status}</li>
                          </ul>
                        </div>

                        {animal.contact && (
                          <div className="small text-muted">
                            <h6 className="fw-bold">Contact:</h6>
                            {animal.contact.email && (
                              <div>Email: <a href={`mailto:${animal.contact.email}`}>{animal.contact.email}</a></div>
                            )}
                            {animal.contact.phone && (
                              <div>Phone: {animal.contact.phone}</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>
          
        </main>

      </div>
    </>
  );
}
