const express = require("express");
const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("URL Base da API");
});
//Set cards
const CardsController = require("./controllers/CardController");
routes.get("/cards", CardsController.index);
routes.get("/cards/posted", CardsController.showOne);
routes.get("/cards/:id", CardsController.show);
routes.post("/cards", CardsController.store);
routes.put("/cards/:id", CardsController.update);
routes.delete("/cards/:id", CardsController.destroy);

//Admin Purposes
const AdminsController = require("./controllers/AdminsController");
routes.get("/admins", AdminsController.index);
routes.get("/admin/:id", AdminsController.show);
routes.post("/admin", AdminsController.store);
routes.put("/admin/:id", AdminsController.update);
routes.delete("/admin/:id", AdminsController.destroy);

//Create Years
const YearsController = require("./controllers/YearController");
routes.get("/years", YearsController.index);
routes.get("/year/:id", YearsController.show);
routes.post("/year", YearsController.store);
routes.put("/year/:id", YearsController.update);
routes.delete("/year/:id", YearsController.destroy);

//Auth Controller

const AuthController = require("./controllers/AuthController");
routes.post("/admin/login", AuthController.authenticate);
routes.post("/admin/logout/:id", AuthController.logout);
routes.post("/admin/verifyToken/:token", AuthController.checkToken);

//Report routes
const ReportController = require("./controllers/ReportController");
routes.get("/reports", ReportController.index);
routes.get("/reports/:id", ReportController.show);
routes.post("/reports", ReportController.store);
routes.put("/reports/:id", ReportController.update);
routes.delete("/reports/:id", ReportController.destroy);

module.exports = routes;
