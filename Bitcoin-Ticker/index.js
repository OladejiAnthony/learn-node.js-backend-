const express = require("express");
var bodyParser = require("body-parser");
const axios = require("axios");
const request = require("request");

const app = express();
const port = 3000;
// Middleware to parse URL-encoded bodies (for form submissions)
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

app.get("/", (req, res) => {
  //To send an entire file to the browser i.e index.html from the server use:
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  console.log(req.body.crypto);

  axios
    .get("https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD")
    .then((response) => {
      console.log("data:", response.data);
      console.log("status:", response.status);
    })
    .catch((error) => {
      console.error(error);
    });
});

//request() module when making api request to an external server
