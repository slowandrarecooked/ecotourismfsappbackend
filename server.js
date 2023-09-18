const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const app = express();
const bcrypt = require("bcrypt");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./config/db");

const { userController } = require("./controllers/user.controller");
const { UserModel } = require("./models/users.model");
const {
  destinationController,
} = require("./controllers/destinations.controller");
app.use(cors());
app.use(express.json());
app.use("/users", userController);
app.use("/destinations", destinationController);
app.get("/", async (req, res) => {
  res.send({ msg: "BASE API ENDPOINT" });
});
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const hash = await bcrypt.hash(password, 2);
  const newuser = new UserModel({
    username,
    email,
    password: hash,
  });
  try {
    await newuser.save();
    res.send({ msg: "user added" });
  } catch (error) {
    res.send({ msg: "Unable to add user" });
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const is_user = await UserModel.findOne({ email });
  if (is_user) {
    bcrypt.compare(password, is_user.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ id: is_user._id }, process.env.SECRET);
        res.send({ token: token });
      } else if (err) {
        console.log(err);
      } else {
        res.send({ msg: "incorrect credentials" });
      }
    });
  } else {
    res.send("user not found");
  }
});
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("listening on port ");
  } catch (error) {
    console.log("error while connecting to db");
    console.log(error);
  }
});
