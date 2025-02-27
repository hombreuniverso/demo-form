//Users Routers - routes/userRouter.js

//Import express
const express = require("express");

//Create an instance of router named usersRouter
const usersRouter = express.Router();

/* or
//Import express and create an instance of Router()
const {Router} = require("express"); 

//Set usersRouter to Router()
const usersRouter = Router();
*/

//Import users controller
const usersController = require("../controllers/usersController");

//Set up routes
//Index route
usersRouter.get("/", usersController.usersListGet);
//Create route
usersRouter.get("/create", usersController.usersCreateGet);
//Post route
usersRouter.post("/create", usersController.usersCreatePost);

//Update route
usersRouter.get("/:id/update", usersController.usersUpdateGet);
//Post route
usersRouter.post("/:id/update", usersController.usersUpdatePost);

//Delete route
usersRouter.post("/:id/delete", usersController.usersDeletePost);
//Export users router
module.exports = usersRouter;
