/*create our first server */

const express = require("express");

const app = express();

app.listen(3000, function () {
  console.log(`Server started on port: ${3000}`);
});

app.get("/", function (req, res) {
  res.send("Hello, how are you!");
  //console.log(request);
});

app.get("/contact", function (request, response) {
  response.send("Contact me at: anthony@gmail.com");
});

app.get("/about", (req, res) => {
  res.send("About Me: My name is Anthony. I am a Software Developer");
});

app.get("/shop", (req, res) => {
  res.send("<ul><li>Coffee</li><li>Beer</li><li>Tea</li></ul>");
});
