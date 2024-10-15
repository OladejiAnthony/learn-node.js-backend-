const express = require("express");
var bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 3000;
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
    res.send("<h1>Yay it's the weekend!</h1>");
  } else {
    //res.send("<h1>Boo! I have to work!</h1>");
    //use res.write to send multiple pieces of data to the browser
    // res.write("<p>It is not the weekend.</p>");
    // res.write("<h1>Boo! I have to work!</h1>");
    // res.send();
    res.sendFile(__dirname + "/index.html")
  }
});

