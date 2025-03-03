# demo-form

This app is to practise handling forms - validation and sanitization - in order to ensure data integrity and protection

Set up app with EJS templating

Install express, ejs and 
express-validator:
npm install express ejs express-validator

Create folders: routes, views, controllers, storages

Set up server in app.js

Write the code to set the view folder, ejs engine and public folder

Write code for usersRouter 

Update index code to show list of users created 

Create a form to make users

At this point form is working - one can create new users and see them displayed on the index page

Add validation and sanitization of form

Use try-catch block in usersController.js in the function "usersCreatePost" to assist in error handling in order to log error

Create update button/ link in index.ejs

Make routes for updating users

Add logic in controller for request to update users

Create delete button in index.ejs

Add logic in controller for deleting users

Make route for deleting user

Extend app to include email, age and bio in create and update forms and controller

Solve problem with textarea data not showing up in update form

This problem occurred because textarea does not have a value property like input

The data between the html tags <textarea> </textarea> is considered its value.

The problem was solved by placing the code between the html textarea tags:
<textarea ...><%=user.bio%></textarea>


