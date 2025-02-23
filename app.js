//This is the main entry to the app

//Import modules
const express = require("express");
const path = require("node:path");

//Create an instance of express
const app = express();

//Create variable for the port
const PORT = process.env.PORT || 3000;

//Set up server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Set the views folder
app.set("views", path.join(__dirname, "views"));

//Set the view engine
app.set("view engine", "ejs");

//Create variable for public assets
const assetsPath = path.join(__dirname, "public");

//Set the public folder
app.use(express.static(assetsPath));


app.get('/', (req, res) => {
    res.render("index", {title: "Homepage"});
})

