var UserService = require("../services/user.service");
var jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const OTPModel = require('../models/otp.model');
const nodemailer = require("nodemailer");
const axios = require('axios');
var amqp = require("amqplib");
var bcrypt=require("bcrypt")
var generatedCode;
 
 
 
exports.signup = async function (req, res) {
  var data = req.body;
  console.log("---------Signup Data-------", data);
  const welcomeEmailRequest = {
    email: data.email,
  };
 
  try {
    const existingUser = await UserService.findUser(data);
    if (existingUser) {
      console.log("user exists")
      return res.status(400).send({
        message: "User already exists",
      });
    }
 
    const verificationCode = generateVerificationCode();
    const otpData = await OTPModel.create({
      email: data.email,
      code: verificationCode,
    });
    console.log(otpData)
    // await sendVerificationCode(data.email, verificationCode);
    console.log(await sendVerificationCode(data.email, verificationCode))
    const hashedPassword = await bcrypt.hash(data.password, 10);
    var userRes = await UserService.addUser({
      ...data,
      password: hashedPassword,
      isVerified: false,
      verificationCode: verificationCode,
    });
 
    if (userRes) {
      res.status(200).send({
        message: "User Registered, verification mail sent",
        data: req.body,
      });
 
      console.log("before Connection ");
      const connection = await amqp.connect('amqp://127.0.0.1');
      console.log("Connection created");
 
      const channel = await connection.createChannel();
 
      var queue = 'MailerQueue';
      var msg = welcomeEmailRequest.email;
 
      channel.assertQueue(queue, {
        durable: false,
      });
 
      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(" [x] Sent %s", msg);
    }
 
  } catch (e) {
    console.error(e);
    res.status(500).send({
      message: "User Already Exists!!",
    });
  }
};
 
 
function generateVerificationCode() {
  generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
  return generatedCode
}
 
 
async function sendVerificationCode(email, verificationCode) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'gmail',
    auth: {
      user: 'vardhanreddy2503@gmail.com',
      pass: "efry xilh xdge uobv"
    }
  });
 
  const mailDetails = {
    from: 'vardhanreddy2503@gmail.com',
    to: email,
    subject: 'Verification Code',
    text: `Your verification code is: ${verificationCode}`,
  };
 
  await transporter.sendMail(mailDetails);
}
 
exports.verifyUser = async function (req, res) {
  const { email, code } = req.body;
  try {
    const otpData = await OTPModel.findOne({ email, code });
    console.log(otpData)
    if (!otpData) {
      return res.status(400).send({
        message: "Invalid verification code or email",
      });
    }
    await UserService.markUserAsVerified(email);
 
    return res.status(200).send({
      message: "User Verified successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({
      message: "Internal server error",
    });
  }
};
 
 
 
exports.login = async function (req, res) {
  var data = req.body;
 
  try {
    var result = await UserService.findUser({ email: data.email });
    // console.log(result)
    const isPasswordValid = bcrypt.compare(data.password, result.password)
    // console.log(data.password, result.password)
    console.log(isPasswordValid);
    if (isPasswordValid) {
      var payload = {
        name: result.name,
        email: result.email,
        role: result.role,
      };
      var token = jwt.sign(payload, "mysecretkey");
      console.log("token", token);
      res.set("Authorization", token);
      res.send({
        token:token,
        data: result,
      });
    } else {
      res.status(204).send({
        message: "Invalid Login",
      });
    }
  } catch (e) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};