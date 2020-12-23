const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  userName: {
    type: String,
    required: [true, "Name is required"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
  isPosted: {
    type: Boolean,
    default: true,
  },
});

const Cards = mongoose.model("cards", CardSchema);

module.exports = Cards;
