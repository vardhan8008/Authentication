var UserModel=require("../models/user.model")
const bcrypt = require('bcrypt');
 
exports.addUser = async function(data){
  var userdata = new UserModel(data);
  try{
      const hashedPassword = await bcrypt.hash(data.password, 10);
      userdata.password = hashedPassword;
      var result = await userdata.save();
      console.log(result)
      console.log("result of adding user", result);
      return result;
  }
  catch(e){
      throw e;
  }
}
 
 
exports.markUserAsVerified = async function(email) {
    try {
      const user = await UserModel.findOneAndUpdate(
        { email: email },
        { $set: { isVerified: true } },
        { new: true }
      );
      console.log(user);
      return user;
    } catch (error) {
      throw new Error('Unable to mark user as verified');
    }
  };
 
 
 
  exports.findUser = async function(data){
    var projection = {
        name:1,
        email:1,
        role:1,
        password:1
    }
    try {
        var result = await UserModel.findOne(data,projection)
        console.log("result of finding user", result)
        return result
    }
    catch(e){
        throw e
    }
}