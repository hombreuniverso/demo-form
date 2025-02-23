//This is the main entry to the app

//Import modules
const express = require("express");
const path = require("path");

//Create an instance of express
const app = express();

//Create variable for the port
const PORT = process.env.PORT || 3000;

//Set up server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/*
app.get('/', (req, res) => {
    res.send("Success!");
})
*/
