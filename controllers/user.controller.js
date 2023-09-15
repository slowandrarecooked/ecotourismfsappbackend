const express = require("express");
const { UserModel } = require("../models/users.model");
const bcrypt = require("bcrypt");
const userController = express.Router();

userController.get("/", async (req, res) => {
  const users = await UserModel.find();
  res.send({ msg: users });
});

module.exports = {
  userController,
};
