const express = require("express");
var bodyParser = require("body-parser");
const axios = require("axios");

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

/*
app.post("/", (req, res) => {
  //get the values of inputs selected in our html code:
  //console.log(req.body.crypto); & console.log(req.body.fiat);

   const baseUrl = `https://api.coincap.io/v2/assets/`;
  axios
    .get(baseUrl)
    .then((response) => {
      //console.log("data:", response.data);
      //console.log("status:", response.status);

      const data = response.data.data;
      //console.log({data})
      console.log(data.priceUsd);
      var price = data.priceUsd;
      //send price to Browser
      res.send("<h1>The price of bitcoin is " + price + " USD</h1>");
    })
    .catch((error) => {
      console.error(error);
    });
});
*/

app.post("/", (req, res) => {
  const crypto = req.body.crypto; // This will now be 'bitcoin', 'ethereum', or 'litecoin'
  console.log({ crypto });
  const fiat = req.body.fiat.toUpperCase(); // Uppercase fiat for display 'USD', 'GBP', 'EUR'
  console.log({ fiat });

  const baseUrl = `https://api.coincap.io/v2/assets/${crypto}`;

  // Make API request for the selected cryptocurrency
  axios
    .get(baseUrl)
    .then((response) => {
      const data = response.data.data;
      //console.log({ data });

      if (data) {
        const priceUsd = data.priceUsd;
        //console.log({ priceUsd });
        res.send(
          `<h1>The price of ${
            crypto.charAt(0).toUpperCase() + crypto.slice(1)
          } is ${priceUsd} ${fiat}</h1>`
        );
      } else {
        res
          .status(404)
          .send(
            `<h1>${
              crypto.charAt(0).toUpperCase() + crypto.slice(1)
            } not found!</h1>`
          );
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        res
          .status(404)
          .send(
            `<h1>${
              crypto.charAt(0).toUpperCase() + crypto.slice(1)
            } not found!</h1>`
          );
      } else {
        console.error("Error:", error.message);
        res
          .status(500)
          .send("<h1>Something went wrong. Please try again later.</h1>");
      }
    });
});

/*
//Example to send the browser more than one response using res.write():
app.post("/", (req, res) => {
  const crypto = req.body.crypto; // This will now be 'bitcoin', 'ethereum', or 'litecoin'
  console.log({ crypto });
  const fiat = req.body.fiat.toUpperCase(); // Uppercase fiat for display 'USD', 'GBP', 'EUR'
  console.log({ fiat });

  const baseUrl = `https://api.coincap.io/v2/assets/${crypto}`;

  // Make API request for the selected cryptocurrency
  axios
    .get(baseUrl)
    .then((response) => {
      const data = response.data.data;
      console.log({ data });

      if (data) {
        const priceUsd = data.priceUsd;
        console.log({ priceUsd });

        //write two items to a temporary storage, then send to browser
        var currentmarketCapUsd = data.marketCapUsd;
        res.write(
          "<p>The current marketCapUsd is " + currentmarketCapUsd + "</p>"
        );
        res.write(
          `<h1>The price of ${
            crypto.charAt(0).toUpperCase() + crypto.slice(1)
          } is ${priceUsd} ${fiat}</h1>`
        );

        res.send();
      } else {
        res
          .status(404)
          .send(
            `<h1>${
              crypto.charAt(0).toUpperCase() + crypto.slice(1)
            } not found!</h1>`
          );
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        res
          .status(404)
          .send(
            `<h1>${
              crypto.charAt(0).toUpperCase() + crypto.slice(1)
            } not found!</h1>`
          );
      } else {
        console.error("Error:", error.message);
        res
          .status(500)
          .send("<h1>Something went wrong. Please try again later.</h1>");
      }
    });
});

*/

//Working with Path Parameters
// Define a route that accepts 'crypto' as a path parameter
app.get("/price/:crypto", async (req, res) => {
  const crypto = req.params.crypto.toLowerCase(); // get the 'crypto' parameter from the URL
  const baseUrl = `https://api.coincap.io/v2/assets/${crypto}`;
  try {
    const response = await axios.get(baseUrl); // Make request to the CoinCap API
    const data = response.data.data;
    const priceUsd = data.priceUsd;
    res.send(`<h1>The price of ${crypto} is $${priceUsd}</h1>`);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});
//You can open a browser and visit http://localhost:3000/price/bitcoin, http://localhost:3000/price/ethereum, etc.

// Route to fetch crypto prices with optional 'limit' query parameter:
app.get("/prices", async (req, res) => {
  const limit = req.query.limit || 5; // Default limit is 5 if not provided
  const baseUrl = `https://api.coincap.io/v2/assets?limit=${limit}`;
  try {
    const response = await axios.get(baseUrl);
    const data = response.data.data;
    let result = "<h1>Crypto Prices</h1><ul>";
    data.forEach((crypto) => {
      result += `<li>${crypto.name}: $${crypto.priceUsd}</li>`;
    });
    result += "</ul>";
    res.send(result);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});
//You can open a browser and visit http://localhost:3000/prices?limit=3 or http://localhost:3000/prices?limit=10.

