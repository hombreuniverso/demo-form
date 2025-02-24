//Users Controller - controllers/usersController.js

const usersStorage = require("../storages/usersStorage");

exports.usersListGet = (req, res) => {
  res.render("index", {
    title: "User List",
    users: usersStorage.getUsers(),
  });
};

exports.usersCreateGet = (req, res) => {
  res.render("createUserForm", { title: "Create User" });
};

exports.usersCreatePost = (req, res) => {
  const { firstName, lastName } = req.body;
  usersStorage.addUser({ firstName, lastName });
  res.redirect("/");
};

//Validation and Sanitization
const { body, validationResult } = require("express-validator");

const alphaErr = "Must only contain letters.";
const lengthErr = "Must be between 1 and 10 characters.";

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`), body("lastName")
    .trim()
    .isAlpha().withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
   
];

//Array of midlleware validations to controller
exports.usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createUserForm", {
        title: "Create User",
        errors: errors.array(),
      });
    } 
    const { firstName, lastName } = req.body;
      usersStorage.addUser({ firstName, lastName });
      res.redirect("/");
    }
];
