import axios from "axios";
import Car from "../interfaces/Car"; 

let api: string = `${process.env.REACT_APP_API}/favs`;

export function getFav(userId: string) { 
  return axios.get(`${api}/${userId}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } });
}

// הוספת או הסרת מועדפים של המשתמש
export function addOrRemoveFavorites(carToAdd: string) {
  const carId = { _id: carToAdd };
  return axios.post(api, carId, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } });
}
