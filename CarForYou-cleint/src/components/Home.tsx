import React, { FunctionComponent, useEffect, useState } from 'react';
import Car from '../interfaces/Car';
import { getCar, deleteCar } from '../services/CarService';
import { Link, useNavigate } from 'react-router-dom';
import { getFav, addOrRemoveFavorites } from '../services/favService';
import { successMsg } from '../services/feedbackServicw';

interface HomeProps {
  userInfo: any;
  cars: Car[];
}

const Home: FunctionComponent<HomeProps> = ({ userInfo, cars }) => {
  const [carsList, setCarsList] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteCars, setFavoriteCars] = useState<string[]>([]);
  let [dataChanged, setDataChanged] = useState<boolean>(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (userInfo.userId) {
      getFav(userInfo.userId)
        .then((res) => {
          let defaultCarIds: string[] = res.data?.cars.map((car: any) => car._id) || [];
          setFavoriteCars(defaultCarIds);
        })
        .catch((err) => console.log(err));
    }
    getCar()
      .then((res) => {
        setCarsList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  let handleAddToFav = (car: Car) => {
    if (favoriteCars.includes(car._id as string)) {
      addOrRemoveFavorites(car._id as string)
        .then((res) => {
          setFavoriteCars(favoriteCars.filter((id) => id !== car._id));
          successMsg(`${car.title} car was removed from favorites!`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      addOrRemoveFavorites(car._id as string)
        .then((res) => {
          setFavoriteCars([...favoriteCars, car._id as string]);
          successMsg(`${car.title} car was added to favorites!`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
      <h1>Welcome to CarForYou <i className="fa-solid fa-car fa-beat"></i></h1>
      <p>Discover a world of amazing cars waiting for you!</p>
      <p>Explore our wide selection of vehicles from trusted sellers.</p>
      <p>Whether you're looking for a family car, a luxury ride, or something sporty, CarForYou has it all.</p>
      <p>Start your journey by browsing our listings below:</p>

      {userInfo.role === 'business' || userInfo.role === 'admin' ? (
        <Link to="/AddCar" className="btn btn-success my-2">
          Add Car <i className="fa-solid fa-car fa-beat"></i>
        </Link>
      ) : null}

      {carsList.length ? (
        <div className="container-fluid mb-2">
          <div className="row d-flex justify-content-center">
            {carsList.map((car: Car) => {
              return (
                <div
                  key={car._id}
                  className="card col-md-4 mx-2 mb-3"
                  style={{
                    width: '18rem',
                    boxShadow: '0px 4px 12px rgba(255, 255, 255, 0.5)',
                    borderRadius: '8px',
                    padding: '16px',
                  }}
                >
                  <Link to={`/ShowCar/${car._id}`}>
                    <img
                      src={car.image}
                      className="card-img-top"
                      alt={car.title}
                      style={{ width: '100%', height: '16.5rem' }}
                    />
                  </Link>

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
                      Date: {car.date}
                    </p>
                    <p className="card-text">
                      Hand: {car.Hand}
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
                    <hr />
                    {userInfo.role === 'admin' || (userInfo.role === 'business' && userInfo.email === car.owner) ? (
                      <>

                        <Link to={`/update/Car/${car._id}`} className="btn btn-warning mx-1">
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

                    {(userInfo.role === 'regular' || userInfo.role === 'admin' || userInfo.role === 'business') && !favoriteCars.includes(car._id as string) && !isLoading && (
                      <button
                        className="btn btn-primary mx-1"
                        onClick={() => handleAddToFav(car)}
                        disabled={isLoading}
                      >
                        <i className="far fa-heart"></i>
                        <span className="sr-only">Add to Favorites</span>
                      </button>
                    )}

                    {favoriteCars.includes(car._id as string) && !isLoading && (
                      <button
                        className="btn btn-danger mx-1"
                        onClick={() => handleAddToFav(car)}
                      >
                        <i className="far fa-heart"></i>
                        <span className="sr-only">Remove from Favorites</span>
                      </button>
                    )}

                    <button className="btn btn-success">
                      <a href={`tel:${car.phone}`} style={{ color: 'white', textDecoration: 'none' }}>
                        <i className="fa-solid fa-phone"></i>
                      </a>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <p>No cars</p>
      )}
    </>
  );
};

export default Home;


