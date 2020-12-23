const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
require("dotenv").config();
const saltRound = process.env.REACT_APP_saltRound;

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
});

//Cryptography of password
AdminSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    const user = this;
    bcrypt.hash(this.password, saltRound, function (err, passwordEncrypted) {
      if (err) {
        next(err);
      } else {
        user.password = passwordEncrypted;
        next();
      }
    });
  } else {
    next();
  }
});

//check hashed password
AdminSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

const Admin = mongoose.model("admins", AdminSchema);

module.exports = Admin;
