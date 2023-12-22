import axios from 'axios';
import Car from '../interfaces/Car'; 

let api: string = `${process.env.REACT_APP_API}/cars`; 

export function getCar() { 
  return axios.get(api);
}

export function getCarById(_id: string) { 
  return axios.get(`${api}/${_id}`);
}

export function getCarsByOwner() {
  return axios.get(`${api}/MyCar`, { headers: { Authorization: JSON.parse(sessionStorage.getItem('token') as string).token } });
}

export function addCar(newCar: Car) {
  return axios.post(api, newCar, { headers: { Authorization: JSON.parse(sessionStorage.getItem('token') as string).token } });
}

export function updateCar(updatedCar: Car, _id: string) { 
  return axios.put(`${api}/${_id}`, updatedCar, { headers: { Authorization: JSON.parse(sessionStorage.getItem('token') as string).token } });
}

export function deleteCar(_id: string) { 
  return axios.delete(`${api}/${_id}`);
}
