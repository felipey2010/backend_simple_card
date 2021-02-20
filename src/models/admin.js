const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "E-mail is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  lastLoggedIn: {
    type: Date,
    default: Date.now(),
  },
  lastLoggedOut: {
    type: Date,
    default: Date.now(),
  },
});

const Admin = mongoose.model("admins", AdminSchema);

module.exports = Admin;
