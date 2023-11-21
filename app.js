
const Express = require("express");
const path = require("path");
const mongoose = require('mongoose');
var bodyparser = require("body-parser");
const UserModel = require("./models/user.model");
var CarService = require("./cars");
var CarData = require("./carData");
const cors=require("cors")

var UserController=require("./controler/UserController")
require("./dbconnection");
var CarSingleData = require('./carsingledata')
const AuthController = require("./controler/auth.controller")

const Port = process.env.PORT || 7000;

var app = Express();
const corsOptions = { origin : "http://localhost:3000" };
app.use(cors(corsOptions))
// var dbservice = require("./dbservice");
app.use(bodyparser.json());
app.use(Express.static(__dirname + "/public"));
app.post("/verifyuser", UserController.verifyUser);


app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/public/index.html"));
});
app.post("/signup", UserController.signup);
app.post("/login", UserController.login);


app.get("/users/all", async (req, res) => {
  try {
    const users = await CarData.getAllUsers();
    res.send(users);
  } catch (e) {
    console.log("error", e);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});
app.listen(Port, () => {
  console.log("App is running on", Port);
});
