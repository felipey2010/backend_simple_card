const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const requireDir = require("require-dir");
// const routes = require("./src/routes");

const mongoose = require("mongoose");
//Conexão com MongoDB
mongoose.connect(process.env.REACT_APP_DBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
//Test the connection to the database
let db = mongoose.connection;
db.on("error", function (error) {
  console.log(error);
});
db.once("open", function (callback) {
  console.log("Connection Successful!");
});

//MIDDLEWARES
// app.use(express.static("public"));
app.use(express.json());
app.use(cors());
requireDir("./src/models");
app.use("/api", require("./src/routes"));
// app.use(function (err, req, res, next) {
//   res.status(422).send({ error: err.message });
// });

app.listen(PORT, function () {
  console.log("Now listening for request port: " + process.env.REACT_APP_PORT || 5000);
});
