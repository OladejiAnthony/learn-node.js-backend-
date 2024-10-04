//How to respond to Requests with HTML files:

const express = require("express");
var bodyParser = require("body-parser");

const app = express();
const port = 3000;
// Middleware to parse URL-encoded bodies (for form submissions)
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

app.get("/", (req, res) => {
  //res.send("Hello World!");
  //To send an entire file to the browser i.e index.html from the server use:
  //res.sendFile("index.html") //this is using a relative file-path method
  //console.log(__dirname); //this is general file-path method
  res.sendFile(__dirname + "/index.html"); //this gets the file-path whereever it is hosted i.e local or remote server
});

//Note - The "__dirname" helps us grab hold of the current file's location at any given time unlike using relative paths.


app.post("/", (req, res) => {
  //res.send("Thanks for posting!")
  /* log the form data: */
  //console.log(req.body); 
  //console.log(req.body.num1);
  var num1 = req.body.num1;
  var num2 = req.body.num2;
  //convert to number: var num2 = Number(req.body.num2);
  var result = num1 * num2;
  console.log({result});
  res.send(`Total calculation is ${result}`)
})

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/about.html");
})

app.post("/about", (req, res) => {
  console.log(req.body)
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  
  res.send("Welcome " + firstName + " " + lastName)
})


