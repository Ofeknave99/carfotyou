const mongoose = require('mongoose');

const carSchema = 
{title: { type: String },
Company: { type: String },
 model: { type: String },
price: { type: String },
  description: { type: String },
 engine: { type: String },
 horsepower: { type: String },
km: { type: String },
  phone: { type: String },
  email: { type: String },
  typegear: { type: String,required: false },
  image: { type: String },
  state: { type: String, required: false},
  country: { type: String },
  city: { type: String },
  street: { type: String },
  Hosenumber: { type: Number,required: false },
  Hand: { type: Number,required: false },
   owner:  { type: String },
   date:  { type: String },
};
const Car = mongoose.model('cars',carSchema );

module.exports = Car;
