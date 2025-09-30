import perrito from '../images/perrito.gif'
// Importamos React y el hook useState para manejar el estado del componente
import React, { useState } from 'react';

// Importamos los estilos personalizados
import '../styles.css'; 

// Componente principal
export default function Adoption() {
  // Estado que contiene la lista de animales obtenidos de la API
  const [animals, setAnimals] = useState([]);

  // Estado que indica si se está realizando una búsqueda (para mostrar spinner)
  const [search, setSearch] = useState(false);

  // Estado que almacena el filtro de estado seleccionado (adoptable, adopted, found)
  const [status, setStatus] = useState('');

  // Estado que guarda un posible error al hacer la búsqueda
  const [error, setError] = useState(null);

  // Estado para saber si ya se ha hecho una búsqueda
  const [hasSearched, setHasSearched] = useState(false);

  // Lista de opciones para filtrar por estado
  const statusOptions = [
    {
      label: 'Adoptable',
      value: 'adoptable',
      description: 'Animals available for adoption',
    },
    {
      label: 'Adopted',
      value: 'adopted',
      description: 'Animals that have already been adopted',
    },
    {
      label: 'Found',
      value: 'found',
      description: 'Animals found and looking for a home',
    },
  ];

  // Función para realizar la búsqueda de animales según el estado seleccionado
  const handleSearch = async () => {
    // Si no se ha seleccionado un estado, mostramos una alerta
    if (!status) {
      alert('Please select a status');
      return;
    }

    // Activamos el estado de búsqueda y reiniciamos errores
    setSearch(true);
    setHasSearched(true);
    setError(null);

    try {
      // Realizamos la solicitud a la API backend con el estado seleccionado
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/animals?status=${status}`
      );

      // Si la respuesta no es correcta, lanzamos un error
      if (!response.ok) throw new Error('Error fetching data');

      // Parseamos la respuesta a JSON
      const data = await response.json();

      // Guardamos los animales recibidos (o un array vacío si no hay)
      setAnimals(data.animals || []);
    } catch (err) {
      // Si ocurre un error, lo guardamos en el estado y vaciamos la lista
      setError(err.message);
      setAnimals([]);
    } finally {
      // Finalizamos la búsqueda (apagamos el spinner)
      setSearch(false);
    }
  };

  // Render del componente
  return (
    <>
      {/* Contenedor principal de la aplicación (flex para sticky footer si se usa) */}
      <div className="app-container">

        {/* Contenido principal */}
        <main className="main-content">
          <div className="container my-5">
            {/* Título principal */}
            <h1 className="text-center mb-3 fw-bold text-black">
              ❤️ Adopt, Find, Save Lives
            </h1>

            {/* Subtítulo */}
            <p className="text-center text-muted mb-4">
              Search animals available by their status
            </p>

            {/* Filtro por estado (dropdown + botón) */}
            <div className="row justify-content-center mb-4">
              {/* Selector de estado */}
              <div className="col-md-5">
                <select
                  className="form-select shadow-sm"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Select a status</option>
                  {/* Generamos opciones del dropdown dinámicamente */}
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Botón de búsqueda */}
              <div className="col-md-2 mt-3 mt-md-0">
                <button
                  className="btn btn-success w-100 shadow-sm"
                  onClick={handleSearch}
                  disabled={search} // deshabilitado mientras está buscando
                >
                  {search ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>

            {/* Mostrar mensajes de estado */}
            {error && (
              <div className="alert alert-danger text-center">
                {error}
              </div>
            )}

            {/* Mensaje de descripción según estado seleccionado */}
            {hasSearched && status && (
              <div className="alert alert-info text-center">
                {
                  statusOptions.find((opt) => opt.value === status)?.description
                }
              </div>
            )}

            {/* Si no hay resultados y se ha buscado, mostrar mensaje */}
            {!search && hasSearched && animals.length === 0 && (
              <p className="text-center text-muted">No animals to display.</p>
            )}

            {/* Spinner mientras se está buscando */}
            {search ? (
              <div className="spinner-container">
                <img
                  src={perrito}
                  alt="Loading..."
                  className="spinner-img"
                />
              </div>
            ) : (
              // Resultados: Lista de animales
              <div className="row g-4">
                {animals.map((animal) => (
                  <div className="col-lg-6" key={animal.id}>
                    <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                      <div className="row g-0 h-100">

                        {/* Columna de imagen */}
                        <div className="col-md-5">
                          {animal.photos && animal.photos.length > 0 ? (
                            <img
                              src={animal.photos[0].medium}
                              alt={animal.name}
                              className="img-fluid h-100 w-100 object-fit-fill"
                            />
                          ) : (
                            // Imagen por defecto si no hay foto
                            <div className="bg-secondary text-white d-flex align-items-center justify-content-center h-100">
                              <span className="fw-bold">No image</span>
                            </div>
                          )}
                        </div>

                        {/* Columna de información del animal */}
                        <div className="col-md-7 p-4 d-flex flex-column justify-content-between">
                          <div>
                            {/* Nombre del animal */}
                            <h5 className="card-title fw-bold mb-2">{animal.name}</h5>

                            {/* Lista con características del animal */}
                            <ul className="list-unstyled small mb-3">
                              <li><strong>Type:</strong> {animal.type}</li>
                              <li><strong>Age:</strong> {animal.age || 'Unknown'}</li>
                              <li><strong>Gender:</strong> {animal.gender || 'Unknown'}</li>
                              <li><strong>Size:</strong> {animal.size || 'Unknown'}</li>
                              <li>
                                <strong>Location:</strong>{' '}
                                {animal.contact?.address?.city || 'Unknown'},{' '}
                                {animal.contact?.address?.state || ''}
                              </li>
                              <li><strong>Status:</strong> {animal.status}</li>
                            </ul>
                          </div>

                          {/* Información de contacto (si existe) */}
                          {animal.contact && (
                            <div className="small text-muted">
                              <h6 className="fw-bold">Contact:</h6>

                              {/* Email */}
                              {animal.contact.email && (
                                <div>
                                  Email:{' '}
                                  <a href={`mailto:${animal.contact.email}`}>
                                    {animal.contact.email}
                                  </a>
                                </div>
                              )}

                              {/* Teléfono */}
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
