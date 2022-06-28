const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const contactController = require("./src/controllers/contactController");
const { isLogged } = require("./src/middlewares/middleware");

//homeController
route.get("/", homeController.index);

//loginController
route.get("/login", loginController.index);
route.post("/login/register", loginController.register);
route.post("/login/login", loginController.login);
route.get("/login/logout", isLogged, loginController.logout);

//contactController
route.get("/contact", isLogged, contactController.index);
route.post("/contact/register", isLogged, contactController.register);
route.get("/contact/:id", isLogged, contactController.view);
route.post("/contact/edit/:id", isLogged, contactController.edit);
route.get("/contact/delete/:id", isLogged, contactController.delete);

module.exports = route;
