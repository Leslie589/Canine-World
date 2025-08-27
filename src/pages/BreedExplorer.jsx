// Importamos React y los hooks necesarios para manejar estado y efectos secundarios
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "../styles.css";

// API Key para autenticar peticiones a TheDogAPI
const API_KEY =process.env.REACT_APP_DOG_API_KEY;



export default function BreedExplorer() {
          
  const [dogs, setDogs] = useState([]);                // Estado para guardar las razas de perros
  const [text, setText] = useState("");                // Estado para el texto de búsqueda (input)
  const [searched, setSearched] = useState(false);     // Estado para saber si se hizo una búsqueda
  const [breeds, setBreeds] = useState([]);            // Estado con solo los nombres de las razas (para el <select>)

  // Estado para la paginación (número de página actual)
  const [currentPage, setCurrentPage] = useState(1);

  // Cantidad de razas por página
  const itemsPerPage = 9;

  // useEffect que se ejecuta al cargar el componente (solo una vez)
  useEffect(() => {
    const fetchDogData = async () => {
      try {
        
        // Hacemos una petición a la API para obtener todas las razas
        const res = await fetch("https://api.thedogapi.com/v1/breeds", {
          headers: { "x-api-key": API_KEY },
        });

        // Convertimos la respuesta a JSON
        const data = await res.json();

        // Guardamos los datos completos de las razas
        setDogs(data);

        // Guardamos solo los nombres para el <select>
        setBreeds(data.map((dog) => dog.name));
      } catch (error) {
        console.error(error); // Si ocurre un error lo mostramos en consola
      }
    };

    // Al iniciar, marcamos que no se ha buscado nada
    setSearched(false);

    // Llamamos a la función para obtener las razas
    fetchDogData();
  }, []);

  // Función para buscar una raza por nombre usando la API
  const searchForDog = async () => {
    try {
      const res = await fetch(
        `https://api.thedogapi.com/v1/breeds/search?q=${text}`,
        {
          headers: { "x-api-key": API_KEY },
        }
      );

      const data = await res.json();

      // Guardamos los datos encontrados y reiniciamos la paginación
      setDogs(data);
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
    }
  };

  // Función que maneja el envío del formulario de búsqueda
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que se recargue la página
    searchForDog(); // Llama a la búsqueda
    setSearched(true); // Marca que ya se ha hecho una búsqueda
  };


  // LÓGICA DE PAGINACIÓN

  // Calculamos el índice del último y primer perro en esta página
  const indexOfLastDog = currentPage * itemsPerPage;
  const indexOfFirstDog = indexOfLastDog - itemsPerPage;

  // Obtenemos solo los perros que pertenecen a la página actual
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);

  // Calculamos el total de páginas disponibles
  const totalPages = Math.ceil(dogs.length / itemsPerPage);

  // Función para cambiar la página actual
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // -------------------------------------------
  // RENDER DEL COMPONENTE
  // -------------------------------------------
  return (
    <>
      {/* Mostramos el navbar en la parte superior */}
      <Navbar />

      {/* Contenedor principal de la sección */}
      <section className="container">
        {/* Título principal */}
        <div className="text-center mt-4 mb-4">
          <h1 className="fw-bold fs-1 text-black text-capitalize">
            Find the perfect breed for you
          </h1>
        </div>

        {/* Formulario de búsqueda */}
        <form onSubmit={handleSubmit} className="mx-auto mb-5 form-container" autoComplete="off">
          {/* Campo de texto */}
          <div className="mb-3">
            <input type="text" name="search" placeholder="Discover and search dog breeds"
              className="form-control bg-light text-black"
              value={text} onChange={(e) => setText(e.target.value)} />
          </div>

          {/* Selector de razas (dropdown) */}
          <div className="mb-3">
            <select value={text} onChange={(e) => setText(e.target.value)}

              className="form-select bg-light text-black">
              <option value="">All dog breeds</option>
              {breeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </div>

          {/* Botón para buscar */}
          <div className="text-center">
            <button type="submit" className="btn btn-primary px-4">
              Search
            </button>
          </div>
        </form>

        {/* Listado de razas en tarjetas */}
        <div className="row mt-4">
          {currentDogs.map((dog) => (
            <div className="col-md-4 mb-4" key={dog.id || dog.name}>
              <Link
                to={`/${dog.name}`}
                className="text-decoration-none text-dark"
              >
                <div className="card h-100 d-flex flex-column">
                  {/* Imagen del perro */}
                  <img
                    src={
                      searched
                        ? `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`
                        : dog.image?.url
                    }
                    alt={dog.name}
                    className="card-img-top"
                  />

                  {/* Información de la raza */}
                  <div className="card-body">
                    <h5 className="card-title text-center fw-bold mb-3">
                      {dog.name}
                    </h5>

                    <p className="card-text text-justify">
                      Bred For: {dog.bred_for || "Información no disponible"}
                    </p>

                    <small className="text-primary fst-italic fs-6 d-block">
                      Click to see more details...
                    </small>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Componente de paginación Bootstrap */}
        <nav>
          <ul className="pagination justify-content-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                className={`page-item ${currentPage === index + 1 ? "active" : ""
                  }`}
                key={index + 1}
              >
                <button
                  onClick={() => paginate(index + 1)}
                  className="page-link"
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {/* Footer permanente en la parte inferior */}
      <Footer />
    </>
  );
}
