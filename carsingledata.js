const CarModel = require('./models/car.model');
 
async function getCarById(carId) {
  try {
    const car = await CarModel.findById(carId);
 
    if (!car) {
      return null;
    }
 
    return car;
  } catch (error) {
    throw error;
  }
}
 
module.exports = {
  getCarById,
};