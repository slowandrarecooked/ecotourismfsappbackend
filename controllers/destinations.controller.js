const express = require("express");
const { authentication } = require("../middlewares/authentication");
const { DestinationModel } = require("../models/destinations.model");

const destinationController = express.Router();

destinationController.get("/", authentication, async (req, res) => {
  let destinations = [];

  const queries = req.query;
  if (queries.page) {
    destinations = await DestinationModel.find()
      .limit(6)
      .skip((Number(queries.page) - 1) * 6);
  }

  if (queries.rating) {
    destinations = await DestinationModel.find({
      rating: queries.rating,
    }).limit(6);
  }
  if (queries.q) {
    destinations = await DestinationModel.find({
      location: { $regex: queries.q },
    }).limit(6);
  }
  if (queries.sort) {
    destinations = await DestinationModel.find().limit(6);
    if (queries.order === "asc") {
      destinations.sort((a, b) => {
        Number(a.fees) - Number(b.fees);
      });
    }
    if (queries.order === "desc") {
      destinations.sort((a, b) => {
        Number(b.fees) - Number(a.fees);
      });
    }
  }

  res.send({ data: destinations });
});
destinationController.get(
  "/:destinationId",
  authentication,
  async (req, res) => {
    const { destinationId } = req.params;
    const destination = await DestinationModel.findOne({ _id: destinationId });
    res.send(destination);
  }
);

module.exports = {
  destinationController,
};
