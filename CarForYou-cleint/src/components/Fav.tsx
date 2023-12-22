import React, { FunctionComponent, useEffect, useState } from "react";
import { addOrRemoveFavorites, getFav, } from "../services/favService";
import Car from "../interfaces/Car";
import { successMsg } from "../services/feedbackServicw";
import { getCar } from "../services/CarService";
interface FavProps {
  userInfo: any;
}

const Fav: FunctionComponent<FavProps> = ({ userInfo }) => {
  const [favs, setFavs] = useState<Car[]>([]);
  const [favoriteCars, setFavoriteCars] = useState<string[]>([]);

  const handleAddToFav = (car: Car) => {
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
      getFav(car._id as string)
        .then((res) => {
          setFavoriteCars([...favoriteCars, car._id as string]);
          successMsg(`${car.title} car was added to favorites!`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getFav(userInfo.userId)
      .then((res) => {
        const defaultCarIds: string[] = res.data?.cars.map((car: any) => car._id) || [];
        setFavoriteCars(defaultCarIds);
      })
      .catch((err) => console.log(err));
  }, [userInfo.userId]);

  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    getCar()
      .then((res) => {
        setCars(res.data.filter((car: Car) => favoriteCars.includes(car._id as string)));
      })
      .catch((err) => console.log(err));
  }, [favoriteCars]);
  ;

  return (
    <>
      <h1>Your Favorites</h1>
      {cars.length ? (
        <div className="container-fluid mb-2">
          <div className="row d-flex justify-content-center">
            {cars.map((car: Car) => (
              <div
                key={car._id}
                className="card col-md-4 mx-2 mb-3"
                style={{
                  width: "18rem",
                  boxShadow: "0px 4px 12px rgba(255, 255, 255, 0.5)",
                  borderRadius: "8px",
                  padding: "16px",
                }}
              >
                <img
                  src={car.image}
                  className="card-img-top"
                  alt={car.title}
                  style={{ width: "100%", height: "16.5rem" }}
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
                  <button
                    className="btn btn-danger"
                    onClick={() => handleAddToFav(car)}
                  >
                    {favoriteCars.includes(car._id as string)
                      ? "Remove Favorite"
                      : "Add to Favorites"}
                  </button>
                  <button className="btn btn-success mx-2 ">
                    <a href={`tel:${car.phone}`} style={{ color: "white", textDecoration: "none" }}>
                      <i className="fa-solid fa-phone"></i>
                    </a>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No cars</p>
      )}
    </>
  );
};

export default Fav;
