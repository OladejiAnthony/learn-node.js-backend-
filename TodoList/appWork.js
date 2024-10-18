const express = require("express");
var bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 3000;

var workItems = [];
var items = ["Buy Food", "Cook Food", "Eat Food"];

//ejs view engine
app.set("view engine", "ejs");
// Middleware to parse URL-encoded bodies (for form submissions)
app.use(bodyParser.urlencoded({ extended: true }));

//provide path of static files (images and css files)
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

app.get("/", (req, res) => {
  var today = new Date();
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
  };
  let day = today.toLocaleDateString("en-NG", options);
  //console.log({ day });

  res.render("work", { listTitle: day, newListItems: items });
});


app.get("/work", (req, res) => {
  res.render("work", {
    listTitle: "Work List",
    newListItems: workItems,
  });
});


app.post("/work", (req, res) => {
  let item = req.body.newItem;
  
  if (req.body.button === "Work List") {
    // Add item to workItems if it's the work route
    workItems.push(item);
    res.redirect("/work");
  } else {
    // Add item to home list if it's the home route
    items.push(item);
    res.redirect("/");
  }
});

app.get("/about", (req, res) => {
  res.render("about")
})
//8mins

