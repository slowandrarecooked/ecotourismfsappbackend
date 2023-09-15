const mongoose = require("mongoose");

const destinationSchema = mongoose.Schema({
  image: { type: String, required: true },
  destination_title: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: String, required: true },
  fees: { type: String, required: true },
  description: { type: String, required: true },
  attractions: { type: Array, required: true },
});

const DestinationModel = mongoose.model("destination", destinationSchema);

module.exports = {
  DestinationModel,
};
