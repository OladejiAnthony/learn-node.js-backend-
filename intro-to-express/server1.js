
const express = require("express");

//This app starts an Express server and listens on port 3000 for connections.
const app = express();
const port = 3000;

//The app responds with “Hello World!” for requests to the root URL (/) or route.
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  res.send("Got a POST request");
});

//This tells express to listen on a specific port for any HTTP requests that gets sent to our server.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


