var Mongoose = require("mongoose");
const url ="mongodb://127.0.0.1:27017/database1"

//const url ="mongodb+srv://vardhan:Vardhan8008@myserver.vd4cbiz.mongodb.net/?retryWrites=true&w=majority";
async function connect() {
  try {
    var client = await Mongoose.connect(url);
    console.log("Connected to database");
  } catch (e) {
    console.log("Error in connecting to mongodb", e);
  }
}

connect();
