import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Car from '../interfaces/Car';
import { getCarById } from '../services/CarService';
import { string } from 'yup';

const Showcar: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    getCarById(id!)
      .then((res) => setCar(res.data))
      .catch((err) => console.log(err));
  }, [id]);


  if (!car) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="container col-md-6 mt-5 d-flex flex-column align-items-center justify-content-center"
      style={{
        backgroundColor: "#8888889c", // צבע רקע עם rgba
        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)', // צל
        borderRadius: '8px', // פינות מעגליות
        padding: '16px', // מרווח פנימי
        color: 'white', // צבע טקסט
      }}

    >
      <h1>{car.title}</h1>
      <img
        src={car.image}
        alt={car.title}
        style={{ width: '50%', height: 'auto', borderRadius: '10px', marginBottom: '16px' }}
      />
      <p style={{ textAlign: 'left' }}>
        <strong>Description:</strong> {car.description}
      </p>
      <p>
        <strong>Company:</strong> {car.Company}
      </p>
      <p>
        <strong>Model:</strong> {car.model}
      </p>
      <p>
        <strong>Engine :</strong> {car.engine} סמ"ק
      </p>
      <p>
        <strong>horsepower :</strong> {car.horsepower} כ"ס
      </p>
      <p>
        <strong>Kilometers:</strong> {car.km}
      </p>
      <p>
        <strong>Date:</strong> {car.date}
      </p>
      <p>
        <strong>Phone:</strong> {car.phone}
      </p>
      <p>
        <strong>Email:</strong> {car.email}
      </p>
      <p>
        <strong>Type Gear:</strong> {car.typegear || 'Not specified'}
      </p>
      <p>
        <strong>Hand:</strong> {car.Hand}
      </p>
      <p>
        <strong>Country:</strong> {car.country}
      </p>
      <p>
        <strong>City:</strong> {car.city}
      </p>
      <p>
        <strong>Street:</strong> {car.street}
      </p>
      <p>
        <strong>House Number:</strong> {car.Hosenumber || 'Not specified'}
      </p>

      <p>
        <strong>Price:</strong> {car.price} ₪
      </p>
      <div className="icons">
        <button className="btn btn-success">
          <a href={`tel:${car.phone}`} style={{ color: 'white', textDecoration: 'none' }}>
            <i className="fa-solid fa-phone"></i>
          </a>
        </button>
        <span style={{ margin: '0 10px' }}></span>
        <a href={car.state} style={{ fontSize: '2.5rem', color: 'white' }}>
          <i className="fa-solid fa-map-location-dot fa-bounce"></i>
        </a>
      </div>

    </div>
  );
};

export default Showcar;
