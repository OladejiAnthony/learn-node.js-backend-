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

//Get Home route
app.get("/", (req, res) => {
  //To send an entire file to the browser i.e index.html from the server use:
  res.sendFile(__dirname + "/signup.html");
});

/*
app.post("/", (req, res) => {
  //var user = req.body;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  //console.log({user})
  console.log(firstName, lastName, email)
  res.send(`User Details are ${firstName} ${lastName} ${email}`)
})
*/

const mailchimpAPIKey = "32cad7bb0a2ba5fb7c3b94e68f69ef42-us11";
const mailchimpListID = "5c8c4e1056";
//Post signup data to db
app.post("/", async (req, res) => {
  const { firstName, lastName, email } = req.body;

  //body posted to the server
  var data = {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName,
    },
  };

  const mailchimpEndpoint = `https://us11.api.mailchimp.com/3.0/lists/${mailchimpListID}/members`;

  try {
    const response = await axios.post(mailchimpEndpoint, data, {
      headers: {
        Authorization: `apikey ${mailchimpAPIKey}`,
        "Content-Type": "application/json",
      },
    });
    //console.log({response})

    console.log("Success:", response.data);
    //res.send("Successfully signed up!");
    res.sendFile(__dirname + "/success.html");
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    if (error.response) {
      console.log(
        "Full error details:",
        error.response.headers,
        error.response.status,
        error.response.data
      );
    }
    //res.send("Failed to sign up. Please try again.");
    res.sendFile(__dirname + "/failure.html");
  }
});

app.post("/failure", (req, res) => {
  //redirect back to Signup page (get route "/")
  res.redirect("/");
})

/*
var data = {
  members: [
    {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      },
    },
  ],
};
*/
