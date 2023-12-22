import React, { FunctionComponent, useState, useEffect } from 'react';
import Car from '../interfaces/Car';
import { deleteCar, getCarById, getCarsByOwner } from '../services/CarService';
import { Link } from 'react-router-dom';
import { successMsg } from '../services/feedbackServicw';
interface MyCarProps {
  userInfo: any;
  cars: Car[];
}

const MyCar: FunctionComponent<MyCarProps> = ({ userInfo }) => {
  const [carsList, setCarsList] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCarsByOwner()
      .then((res) => setCarsList(res.data))
      .catch((err) => console.log(err));
  }, [userInfo.email]);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure?')) {
      deleteCar(id)
        .then((res) => {
          setCarsList(carsList.filter((car) => car._id !== id));
          successMsg('Car deleted successfully!');
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div className="container col-md-3 mt-5 vw-100">
        <h1>Your cars</h1>
        {carsList.length ? (
          <div className="container-fluid mb-2">
            <div className="row d-flex justify-content-center">
              {carsList.map((car: Car) => (
                <div
                  key={car._id}
                  className="card col-md-4 mx-2 mb-3"
                  style={{ width: '18rem', boxShadow: '0px 4px 12px rgba(255, 255, 255, 0.5)', borderRadius: '8px', padding: '16px' }}
                >
                  <img
                    src={car.image}
                    className="card-img-top"
                    alt={car.title}
                    style={{ width: '100%', height: '16.5rem' }}
                  />
                  <hr />
                  <div className="card-body">
                    <h3 className="card-title">{car.title}</h3>
                    <p className="card-text">
                      Company: {car.Company}
                    </p>
                    <p className="card-text">
                      model: {car.model}
                    </p>
                    <p className="card-text">
                      engine: {car.engine} סמ"ק
                    </p>
                    <p className="card-text">
                      horsepower: {car.horsepower} כ"ס
                    </p>
                    <p className="card-text">
                      type gear: {car.typegear}
                    </p>
                    <p className="card-text">
                      k"m: {car.km}
                    </p>
                    <p className="card-text">
                      description: {car.description}
                    </p>
                    <hr />
                    <hr />
                    <p className="card-text text-success">Phone: {car.phone}</p>
                    <hr />
                    <p className="card-text">
                      Address: {car.country} {car.city} {car.street} {car.Hosenumber}
                    </p>
                    <p className="card-text">
                      price: {car.price} ₪
                    </p>
                    {userInfo.role === 'business' || userInfo.role === 'admin' ? (
                      <>

                        <Link
                          to={`/update/Car/${car._id}`}
                          className="btn btn-warning mx-1"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                        <Link
                          to=""
                          className="btn btn-danger"
                          onClick={() => handleDelete(car._id as string)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </Link>
                      </>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No cars</p>
        )}
      </div>
    </>
  );
};

export default MyCar;
