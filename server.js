var express = require("express");
var cors = require("cors");
var app = express();

var bodyParser = require("body-parser");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.json());
const fetch = require("node-fetch");

var corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.get("/", cors(corsOptions), function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for only example.com." });
});

app.post("/fetchPolyLines", cors(corsOptions), function (request, res, next) {
  var source = request.body.source;
  var destination = request.body.source;

  fetch(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${source}&destination=${destination}&mode=driving&key=AIzaSyC92UARV7HJsL0iq2jMsue7JMQJeg2LBcE`
  ).then((response) => response.json())
    .then(async function (json) {
      res.json(json);   
    }
);

app.post("/fetchLocation", cors(corsOptions), function (request, res, next) {
  var apiKey = "AIzaSyC92UARV7HJsL0iq2jMsue7JMQJeg2LBcE"; // this is My API keys
  // var apiKey = " AIzaSyBoYF-LSJz5rEcndQwVyVQoXK9awzTfdp0"; // dont delete it .. this is cleint API
  var source = request.body.source;
  var destination = request.body.destination;

  distanceApiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${source}&destinations=${destination}&language=en&key=${apiKey}`;

  var responseData = {
    source: "",
    destination: "",
    time: "",
  };

  // sending another api request to get latitude and longitude
  response = fetch(distanceApiUrl)
    .then((response) => response.json())
    .then(async function (json) {
      // get lattitude and longitude of location
      var latLong = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${destination},+CA&key=${apiKey}`
      )
        .then((response) => response.json())
        .then((json) => {
          var latlong = json["results"][0]["geometry"]["location"];
          return latlong;
        });

      //
      responseData["lat"] = latLong["lat"];
      responseData["lng"] = latLong["lng"];

      time = json["rows"][0]["elements"][0]["duration"]["text"];
      distance = json["rows"][0]["elements"][0]["distance"]["value"];
      origionAddress = json["origin_addresses"][0];
      destinationAdress = json["destination_addresses"][0];
      responseData["source"] = origionAddress;
      responseData["destination"] = destinationAdress;
      responseData["distance"] = distance;
      responseData["miles"] = parseFloat(
        (distance * 0.000621371192).toFixed(2)
      ); // convert it into miles
      responseData["time"] = time;

      res.json(responseData);

      return;
    });
});

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  console.log(`Click on link to see http://localhost:${port}`);
});
