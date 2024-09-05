const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  challengeName: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  level: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model("InfoCard", cardSchema);
