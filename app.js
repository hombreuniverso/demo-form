//This is the main entry to the app

//Import modules
const express = require("express");
const path = require("node:path");
const usersRouter = require("./routes/usersRouter");

//Create an instance of express
const app = express();

//Create variable for the port
const PORT = process.env.PORT || 4000;

//Set up server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

//Set the views folder
app.set("views", path.join(__dirname, "views"));

//Set the view engine
app.set("view engine", "ejs");

//Create variable for public assets
const assetsPath = path.join(__dirname, "public");

//Set the public folder
app.use(express.static(assetsPath));

//Set up body parser
app.use(express.urlencoded({ extended: true }));

//const bodyParser = require("body-parser");
//app.use(bodyParser.urlencoded({ extended: false }));

//In case the form data is being sent as JSON
//app.use(express.json());

//Set up users router
app.use("/", usersRouter);

