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
const nameLengthErr = "Must be between 1 and 10 characters.";
const emailErr = "Must be a valid email address.";
const bioLengthErr = "Must be between 1 and 200 characters.";

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${nameLengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${nameLengthErr}`),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Must be a valid email address.")
    .withMessage(`Email ${emailErr}`),
  body("age")
    .trim()
    .isNumeric()
    .withMessage("Must be a number.")
    .isInt({ min: 18, max: 120 })
    .withMessage("Must be between 18 and 120."),
  body("bio").isLength({ min: 1, max: 200 }).withMessage(`Bio ${bioLengthErr}`),
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
      const { firstName, lastName, email, age, bio } = req.body;
      usersStorage.addUser({ firstName, lastName, email, age, bio });
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
      const { firstName, lastName, email, age, bio } = req.body;
      usersStorage.updateUser(req.params.id, {
        firstName,
        lastName,
        email,
        age,
        bio,
      });
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.status(500).render("error", {
        title: "Error",
        message: "An error occurred while updating the user.",
      });
    }
  },
];

//Bring up search form
exports.getSearchForm = (req, res) => {
  res.render("searchForm", { title: "Search User", errors: [] });
};

exports.usersSearchGet = (req, res) => {
  let usersFound = [];
  let message = "";
  
  for (let i = 0; i < usersStorage.getUsers().length; i++) {
    if (
      usersStorage.getUsers()[i].firstName == req.query.firstName ||
      usersStorage.getUsers()[i].lastName == req.query.lastName ||
      usersStorage.getUsers()[i].email == req.query.email
    ) {
      usersFound.push(usersStorage.getUsers()[i]);
    }
  }
//No users found
  if (usersFound.length == 0) {
    res.status(404).render("searchResults", {
      title: "Search Result",
      usersFound,
      errors: ["No users found."],
    });
  }
//Users found 
  else {
    res.render("searchResults", {
      title: "Search Result",
      usersFound,
      errors: [],
    });
  }
};

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
};
