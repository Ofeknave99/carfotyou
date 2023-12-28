const express = require("express");
const router = express.Router();
const joi = require("joi");
const auth = require("../middleware/auth");
const Car = require("../modules/car"); 
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const carSchema = joi.object({
  title: joi.string().required(),
  Company: joi.string().required(),
  model: joi.string().required(),
 price: joi.string().required(),
  description: joi.string(),
  engine: joi.string(),
 horsepower: joi.string(),
  km: joi.string(),
  phone: joi.string(),
  email: joi.string().email(),
  typegear: joi.string().min(0),
  image: joi.string(),
  state: joi.string().min(0),
  country: joi.string(),
  city: joi.string(),
  street: joi.string(),
  Hosenumber: joi.number().min(0),
 Hand: joi.number().min(0),
  owner: joi.string(),
  date: joi.string(),
});

// Get all cars
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    if (!cars || cars.length === 0)
      return res.status(400).send("There are no tickets");
    res.status(200).send(cars);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get my cars
router.get("/MyCar", auth, async (req, res) => {
  try {
    const cars = await Car.find({ owner: req.payload.email }); 
    if (!cars || cars.length === 0)
      return res.status(400).send("There are no tickets");
    res.status(200).send(cars); 
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get car by _id
router.get("/:_id", async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.params._id }); 
    if (!car)
      return res.status(400).send("The car details are not available");
    res.status(200).send(car); 
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    if (req.payload.role !== "admin" && req.payload.role !== "business")
      return res.status(400).send("הכרטיס נכשל");

    // Joi validation
    const { error } = carSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if car exists by title and owner
    const car = await Car.findOne({ title: req.body.title, owner: req.body.owner }); 
    if (car) return res.status(400).send("Car already exists"); 

    // Add the new car and save
    const newCar = new Car(req.body); 
    await newCar.save();

    // Return response
    res.status(201).send(`Car "${newCar.title}" added successfully.`); 
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update car by owner/Admin
router.put("/:_id", auth, async (req, res) => {
  try {
    if (req.payload.role !== "admin" && req.payload.email !== req.body.owner)
      return res
        .status(400)
        .send("Only Admin or busniess"); 

    // 1. Joi validation
    const { error } = carSchema.validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    // 2. Verify & Update car by req _id
    const car = await Car.findByIdAndUpdate(req.params._id, req.body, { new: true }); 
    if (!car) return res.status(400).send("No such car"); 

    // 3. Return response
    res.status(200).send(`${car.title} updated successfully!!`); 
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete car
router.delete("/:_id", async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params._id); 
    if (!car) return res.status(400).send("This car does not exist"); 
    res.status(200).send(car);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
