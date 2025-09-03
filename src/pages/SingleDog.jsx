import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import '../styles.css'; 

export default function SingleDog() {
  const [dog, setDog] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const { name } = useParams();

  useEffect(() => {
    const fetchSingleDogData = async () => {
      try {
        // Obtener datos del perro por nombre
        const res = await fetch(
          `https://api.thedogapi.com/v1/breeds/search?q=${name}`
        );
        const data = await res.json();
        setDog(data);

        // Si existe reference_image_id, obtener URL exacta de la imagen
        if (data[0]?.reference_image_id) {
          const imageRes = await fetch(
            `https://api.thedogapi.com/v1/images/${data[0].reference_image_id}`
          );
          const imageData = await imageRes.json();
          setImageUrl(imageData.url);
        } else {
          setImageUrl(null);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSingleDogData();
  }, [name]);

  return (
    <>
     

      <section className="container mt-1 pt-1">
        {dog.length === 0 ? (
          <p>Loading...</p>
        ) : (
          dog.map((item) => (
            <div key={item.id} className="container shadow-lg p-5 rounded-5 mb-5">
              <div className="row g-4 align-items-center">
                <div className="col-md-6 text-center">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={item.name}
                      className="img-fluid w-80 p-3"
                      style={{ maxHeight: "600px", objectFit: "cover" }}
                    />
                  ) : (
                    <p className="text-muted"></p>
                  )}
                </div>
                <div className="col-md-6">
                  <h1 className="display-4 fw-bold mb-5 text-center">{item.name}</h1>

                  {item.description && (
                    <p className="text-muted mb-4">{item.description}</p>
                  )}

                  <ul className=" list list-unstyled mb-4 text-muted">
                    <li>
                      <strong>Bred For:</strong> {item.bred_for || "N/A"}
                    </li>
                    <li>
                      <strong>Height:</strong> {item.height?.metric} cm
                    </li>
                    <li>
                      <strong>Weight:</strong> {item.weight?.metric} kgs
                    </li>
                    <li>
                      <strong>Breed Group:</strong> {item.breed_group || "N/A"}
                    </li>
                    <li>
                      <strong>Lifespan:</strong> {item.life_span}
                    </li>
                    <li>
                      <strong>Temperament:</strong> {item.temperament}
                    </li>
                  </ul>

                  <Link to="/breed" className="btn btn-success">
                    &larr; Go back
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </section>

    </>
  );
}
