const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const contactController = require("./src/controllers/contactController");


//homeController
route.get("/", homeController.index);

//loginController
route.get("/login", loginController.index);
route.post("/login/register", loginController.register);
route.post("/login/login", loginController.login);
route.get("/login/logout", loginController.logout);

//contactController
route.get("/contact", contactController.index);
route.post("/contact/register", contactController.register);



module.exports = route;
