import huellas from '../images/huellas.gif'
// Importamos React y los hooks useEffect y useState
import React, { useEffect, useState } from "react";

// Importamos estilos de Bootstrap para usar clases predefinidas
import "bootstrap/dist/css/bootstrap.css";

// Importamos el componente Link de React Router para navegación interna
import { Link } from "react-router-dom";

// Importamos un componente personalizado para botón de "scroll al inicio"
import ScrollToTopButton from "../components/ScrollToTopButton";

// Importamos los estilos personalizados del proyecto
import "../styles.css";

// Obtenemos la clave de API desde las variables de entorno
const API_KEY = process.env.REACT_APP_DOG_API_KEY;

// Componente principal que se exporta por defecto
export default function BreedExplorer() {
  // Estado para almacenar todas las razas de perros obtenidas
  const [dogs, setDogs] = useState([]);

  // Estado para controlar el texto ingresado por el usuario
  const [text, setText] = useState("");

  // Estado para verificar si se ha realizado una búsqueda
  const [searched, setSearched] = useState(false);

  // Estado que contiene solo los nombres de razas (para el dropdown)
  const [breeds, setBreeds] = useState([]);

  // Estado para controlar la página actual en la paginación
  const [currentPage, setCurrentPage] = useState(1);

  // Estado que indica si los datos están cargando (muestra spinner)
  const [loading, setLoading] = useState(true);

  // Número de razas que se muestran por página
  const itemsPerPage = 6;

  // useEffect se ejecuta una vez cuando el componente se monta
  useEffect(() => {
    // Función asíncrona para obtener todas las razas desde la API
    const fetchDogData = async () => {
      try {
        // Activamos el estado de carga
        setLoading(true);

        // Realizamos una petición GET a la API de razas
        const res = await fetch("https://api.thedogapi.com/v1/breeds", {
          headers: { "x-api-key": API_KEY },
        });

        // Convertimos la respuesta en JSON
        const data = await res.json();

        // Guardamos todos los datos completos de las razas
        setDogs(data);

        // Extraemos solo los nombres para usarlos en el <select>
        setBreeds(data.map((dog) => dog.name));
      } catch (error) {
        // Si ocurre un error, lo mostramos en la consola
        console.error(error);
      } finally {
        // Terminamos la carga
        setLoading(false);
      }
    };

    // Reiniciamos el estado de búsqueda
    setSearched(false);

    // Llamamos a la función para cargar los datos
    fetchDogData();
  }, []);

  // Función para buscar una raza por nombre usando la API
  const searchForDog = async () => {
    try {
      // Activamos estado de carga
      setLoading(true);

      // Llamamos a la API para buscar razas que coincidan con el texto
      const res = await fetch(
        `https://api.thedogapi.com/v1/breeds/search?q=${text}`,
        {
          headers: { "x-api-key": API_KEY },
        }
      );

      // Convertimos la respuesta en JSON
      const data = await res.json();

      // Guardamos los resultados encontrados en el estado
      setDogs(data);

      // Reiniciamos la paginación a la primera página
      setCurrentPage(1);
    } catch (error) {
      // Mostramos errores si ocurren
      console.error(error);
    } finally {
      // Finalizamos la carga
      setLoading(false);
    }
  };

  // Función que maneja el envío del formulario de búsqueda
  const handleSubmit = (e) => {
    // Prevenimos que el formulario recargue la página
    e.preventDefault();

    // Ejecutamos la búsqueda
    searchForDog();

    // Indicamos que se ha hecho una búsqueda
    setSearched(true);
  };

  // -------------------------------
  // LÓGICA DE PAGINACIÓN
  // -------------------------------

  // Índice del último perro en la página actual
  const indexOfLastDog = currentPage * itemsPerPage;

  // Índice del primer perro en la página actual
  const indexOfFirstDog = indexOfLastDog - itemsPerPage;

  // Cortamos el array de perros para mostrar solo los de la página actual
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);

  // Calculamos el número total de páginas
  const totalPages = Math.ceil(dogs.length / itemsPerPage);

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // -------------------------------
  // RENDER DEL COMPONENTE
  // -------------------------------
  return (
    <>
      {/* Contenedor principal del contenido */}
      <section className="container" style={{ minHeight: "70vh" }}>
        {/* Título principal */}
        <div className="text-center mt-4 mb-4">
          <h1 className="fw-bold fs-1 text-black text-capitalize">
            Find the perfect breed for you
          </h1>
        </div>

        {/* Formulario de búsqueda */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-5 form-container"
          autoComplete="off"
        >
          {/* Campo de texto para escribir la búsqueda */}
          <div className="mb-3">
            <input
              type="text"
              name="search"
              placeholder="Discover and search dog breeds"
              className="form-control bg-light text-black"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          {/* Menú desplegable con todas las razas */}
          <div className="mb-3">
            <select
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="form-select bg-light text-black"
            >
              {/* Opción por defecto para ver todas las razas */}
              <option value="">All dog breeds</option>

              {/* Recorremos la lista de razas y creamos una opción por cada una */}
              {breeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </div>

          {/* Botón de búsqueda */}
          <div className="text-center">
            <button type="submit" className="btn btn-primary px-4">
              Search
            </button>
          </div>
        </form>

        {/* Mostramos el spinner de carga si loading es true */}
        {loading ? (
          <div className="spinner-container">
            <img
              src={huellas}
              alt="Loading..."
              className="spinner-img"
            />
          </div>
        ) : (
          <>
            {/* Grid con las tarjetas de perros */}
            <div className="row mt-4">
              {/* Recorremos los perros actuales y creamos una tarjeta por cada uno */}
              {currentDogs.map((dog) => (
                <div className="col-md-4 mb-4" key={dog.id || dog.name}>
                  {/* Link a una ruta dinámica basada en el nombre de la raza */}
                  <Link to={`/${dog.name}`} className="text-decoration-none text-dark">
                    <div className="card h-100 d-flex flex-column">
                      {/* Imagen de la raza */}
                      <img
                        src={
                          searched
                            ? `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`
                            : dog.image?.url
                        }
                        alt={dog.name}
                        className="card-img-top"
                      />

                      {/* Cuerpo de la tarjeta */}
                      <div className="card-body">
                        {/* Nombre de la raza */}
                        <h5 className="card-title text-center fw-bold mb-3">{dog.name}</h5>

                        {/* Información sobre el propósito de la raza */}
                        <p className="card-text text-justify">
                          Bred For: {dog.bred_for || "Información no disponible"}
                        </p>

                        {/* Enlace para más detalles */}
                        <small className="text-primary fst-italic fs-6 d-block">
                          Click to see more details...
                        </small>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Navegación de paginación */}
            <nav>
              <ul className="pagination justify-content-center mt-4">
                {/* Creamos un botón por cada página */}
                {Array.from({ length: totalPages }, (_, index) => (
                  <li
                    className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                    key={index + 1}
                  >
                    <button onClick={() => paginate(index + 1)} className="page-link">
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </>
        )}
      </section>

      {/* Botón flotante para hacer scroll al inicio de la página */}
      <ScrollToTopButton />
    </>
  );
}
