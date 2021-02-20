const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
  card_id: {
    type: String,
    required: [true, "Card id is required"],
  },
  year: {
    type: String,
    required: [true, "Year is required"],
  },
  reason: {
    type: String,
    required: [true, "You need to give a reason"],
  },
});

const Reports = mongoose.model("reports", ReportSchema);

module.exports = Reports;
