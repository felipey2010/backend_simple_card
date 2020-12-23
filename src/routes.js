const express = require("express");
const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("URL Base da API");
});
//Para Produtos
const CardsController = require("./controllers/CardController");
routes.get("/cards", CardsController.index);
routes.get("/cards/posted", CardsController.showOne);
routes.get("/cards/:id", CardsController.show);
routes.post("/cards", CardsController.store);
routes.put("/cards/:id", CardsController.update);
routes.delete("/cards/:id", CardsController.destroy);

//Para Categorias
const AdminsController = require("./controllers/AdminsController");
routes.get("/admin", AdminsController.index);
routes.get("/admin/:id", AdminsController.show);
routes.post("/admin", AdminsController.store);
routes.put("/admin/:id", AdminsController.update);
routes.delete("/admin/:id", AdminsController.destroy);

module.exports = routes;
