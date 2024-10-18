const express = require("express");
var bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 3000;

//ejs view engine
app.set("view engine", "ejs");
// Middleware to parse URL-encoded bodies (for form submissions)
app.use(bodyParser.urlencoded({ extended: true }));

//provide path of static files (images and css files)
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

//logic to test if the current day of the week  is on a weekend
app.get("/", (req, res) => {
  var today = new Date();
  var currentDay = today.getDay();
  if (currentDay === 6 || currentDay === 0) {
    day = "Weekend";
    res.send("<h1>Yay it's the weekend!</h1>");
  } else {
    day = "Weekday";
    //res.send("<h1>Boo! I have to work!</h1>");
    //use res.write to send multiple pieces of data to the browser
    // res.write("<p>It is not the weekend.</p>");
    // res.write("<h1>Boo! I have to work!</h1>");
    // res.send();
    res.sendFile(__dirname + "/index.html");
  }
});

//Use ejs view engine to render the learn.ejs page
app.get("/", (req, res) => {
  var today = new Date();
  var currentDay = today.getDay();
  var day = "";

  switch (currentDay) {
    case 0:
    day = "Sunday";
    break;
    case 1:
    day = "Monday";
    break;
    case 2:
    day = "Tuesday";
    break;
    case 3:
    day = "Wednesday";
    break;
    case 4:
    day = "Thursday";
    break;
    case 5:
    day = "Friday";
    break;
    case 6:
    day = "Saturday";
    break;

    default:
    console.log("Error: current day is equal to: " + currentDay);
  }
  //pass the day varieable into our learn.ejs file
  res.render("learn", { kindOfDay: day });
});

