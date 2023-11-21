const Mongoose = require('mongoose');
 
const UserSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
 
 
var UserModel = Mongoose.model('User', UserSchema);
 
module.exports = UserModel;