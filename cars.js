
var CarModel = require("./models/car.model")

exports.createCar = async function(data){
     var cardata = new CarModel(data)
     var result = await cardata.save()
     console.log("Result of db Storing" , result)
     return result
}