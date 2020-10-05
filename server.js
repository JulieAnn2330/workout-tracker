/* Pseudocode:
1. Create workout tracker for user
2. Technology needed to be installed:
    a. npm init
    b. npm i
    c. MonogoDB
    d. Mongoose
    e. Express
    f. Nodemon
    g. .gitignore
    h. Atlas DB
3. Create
    a. Daily Workouts and track them
    b. log multiple workouts on a given day
    c. track the name, type, weight, sets, reps and duration of exercise
    d. if exercise is cardio, track distanch
4. Modules/Files Needed
    a. Server file
    b. Models folder
        i. user.js
        ii. workoout.js
    c. DB Schema
4. Acceptance criteria
    a. When user loads page they should be able to create a new workout or continue with the last workout
    b. Add exercises to a previous workout plan
    c. Add new exercises to a new workout plan
    d. View the combined weight of multiple exercises on the stats page
    e. Deploy application with Heroku using MongoDB Atlas
    */

   const express = require("express");
   const logger = require("morgan");
   const mongoose = require("mongoose");
   
   const PORT = process.env.PORT || 3000;
   
   const app = express();
   
   app.use(logger("dev"));
   
   app.use(express.urlencoded({ extended: true }));
   app.use(express.json());
   
   app.use(express.static("public"));
   
   mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });
   
   // Creating Routes
    //require("./Develop/routes/apiRoutes")(app);
    //require("./Develop/routes/htmlRoutes")(app);
  
   
   // Start the server
   app.listen(PORT, () => {
     console.log(`App running on port ${PORT}!`);
   });