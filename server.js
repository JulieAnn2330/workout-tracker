/* Pseudocode:
1. Add dependencies
  a. npm i -- DONE
  b. npm i express -- DONE
  c. npm i morgan -- DONE
  d. npm i mongoose -- DONE
  e. npm i compression -- DONE
  f. npm i nodemon - so I don't have to keep restarting server -- DONE
2. User needs
  a. Enter deposits offline -- DONE
  b. Enter expenses offline -- DONE
  c. Populate database when brought online
3. Files to create/update
  a. db.js in public - for indexedDB -- DONE
  b. Update server for heroku -- DONE
  c. Update package.json for nodeomon -- DONE
4. Deployment
  a. MongoDB Atlas -- DONE
  b. Heroku -- DONE
5. Submission criteria
  a. URL to deployed app on heroku -- DONE
  b. GitHub repo -- DONE
*/

const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3000

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", 
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}
);

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});