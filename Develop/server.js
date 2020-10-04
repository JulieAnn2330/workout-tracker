/* Pseudocode:
1. Create workout tracker for user
2. Technology needed to be installed:
    a. MonogoDB
    b. Mongoose
    c. Express
    d. Nodemon
    e. npm i
    f. Atlas DB
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
   
   const db = require("./models");
   
   const app = express();
   
   app.use(logger("dev"));
   
   app.use(express.urlencoded({ extended: true }));
   app.use(express.json());
   
   app.use(express.static("public"));
   
   mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", { useNewUrlParser: true });
   
   db.User.create({ name: "Ernest Hemingway" })
     .then(dbUser => {
       console.log(dbUser);
     })
     .catch(({ message }) => {
       console.log(message);
     });
   
   app.get("/notes", (req, res) => {
     db.Note.find({})
       .then(dbNote => {
         res.json(dbNote);
       })
       .catch(err => {
         res.json(err);
       });
   });
   
   app.get("/user", (req, res) => {
     db.User.find({})
       .then(dbUser => {
         res.json(dbUser);
       })
       .catch(err => {
         res.json(err);
       });
   });
   
   app.post("/submit", ({ body }, res) => {
     db.Note.create(body)
       .then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
       .then(dbUser => {
         res.json(dbUser);
       })
       .catch(err => {
         res.json(err);
       });
   });
   
   app.get("/populateduser", (req, res) => {
     // TODO
     db.User.find({})
     .populate("notes")
     .then(dbUser => {
       res.json(dbUser);
     })
     .catch(err => {
       res.json(err);
     });
   });
     // =====
     // Write the query to grab the documents from the User collection,
     // and populate them with any associated Notes.
     // TIP: Check the models out to see how the Notes refers to the User
   
   
   // Start the server
   app.listen(PORT, () => {
     console.log(`App running on port ${PORT}!`);
   });