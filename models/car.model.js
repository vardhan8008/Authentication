var Mongoose = require("mongoose");
 
var Mongoose = require("mongoose");
 
var CarSchema = new Mongoose.Schema({
  make: { type: String },
  model: { type: String },
  year: { type: Number },
  color: { type: String },
  mileage: { type: Number, default: 0 },
  fuelType: { type: String },
  transmission: { type: String },
  price: { type: Number },
  imageUrl: { type: String },
  condition: { type: String, enum: ['New', 'Used', 'Certified Pre-Owned'] },
  location: { type: String },
  dateListed: { type: Date, default: Date.now },
  engine: { type: String },

});
 
var CarModel = Mongoose.model("CarData", CarSchema);
 
module.exports = CarModel;