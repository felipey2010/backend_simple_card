const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const YearSchema = new Schema({
  year: {
    type: String,
    required: [true, "Year required"],
  },
});

const Years = mongoose.model("years", YearSchema);

module.exports = Years;
