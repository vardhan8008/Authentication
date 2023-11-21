const CarModel = require('./models/car.model')
 const UserModel =require('./models/user.model')
async function getAllCars() {
  try {
    const cars = await CarModel.find();
    return cars;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers(){
  try{
    const users = UserModel.find({}, { password: 0 });
  
    return users;
  }catch (error){
    throw error;
  }
}
 
module.exports = {
  getAllCars,
  getAllUsers,

};