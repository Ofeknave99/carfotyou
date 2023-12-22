import Car from "./Car";

export default interface fav{
     _id?:string;
    userId:string;
    cars: Car[];
    active:boolean;
}