//Users Controller - controllers/usersController.js

const usersStorage = require("../storages/usersStorage");

exports.usersListGet = (req, res) => {
  res.render("index", {
    title: "User List",
    users: usersStorage.getUsers(),
  });
};

exports.usersCreateGet = (req, res) => {
  res.render("createUserForm", { title: "Create User", errors: [] });
};
/*
exports.usersCreatePost = (req, res) => {
  const { firstName, lastName } = req.body;
  usersStorage.addUser({ firstName, lastName });
  res.redirect("/");
};
*/

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
    .withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
];

//Array of midlleware validations to controller
exports.usersCreatePost = [
  validateUser,
  (req, res) => {
    //Improve error handling by using try-catch blocks
    try {
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
    } catch (error) {
      console.log(error);
      res.status(500).render("error", {
        title: "Error",
        message: "An error occurred while creating the user.",
      });
    }
  },
];

exports.usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.render("updateUserForm", { title: "Update User", user, errors: [] });
};

exports.usersUpdatePost = [
  validateUser,
(req, res) => {
  try {
    const user = usersStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateUserForm", {
        title: "Update User",
        user: user,
        errors: errors.array(),
      });
    }
    const { firstName, lastName } = req.body;
    usersStorage.updateUser(req.params.id, { firstName, lastName });
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).render("error", {
      title: "Error",
      message: "An error occurred while updating the user.",
    });
  }
}
];

//Delete a matching user. Otherwise, respond with an error
exports.usersDeletePost = (req, res) => {
  try {
    usersStorage.deleteUser(req.params.id);
    res.redirect("/");    
  } catch (error) {
    console.log(error);
    res.status(500).render("error", {
      title: "Error",
      message: "An error occurred while deleting the user.",
    });
  }
}