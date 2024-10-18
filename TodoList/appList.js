const express = require("express");
var bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 3000;

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
  var day = today.toLocaleDateString("en-NG", options);
  console.log({ day });

  //pass the day variable into our list.ejs file
  //res.render("list", { kindOfDay: day});
  res.render("list", { kindOfDay: day, newListItems: items });
});

app.post("/", (req, res) => {
  var item = req.body.newItem;

  console.log({ item });
  //append item to items array
  items.push(item);

  //res.render("list", { newListItem: item });
  // now redirect to our home route for it to call the  newListItem variable, then create/initialize an items array at the top of the file
  res.redirect("/");
});


//steps
//1.loads the homepage app.get("/")
//2. when post request is triggered, it rediects us back to the homepage with an added list
