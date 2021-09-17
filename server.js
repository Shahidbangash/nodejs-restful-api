var express = require("express");
var cors = require("cors");
var app = express();
var admin = require("firebase-admin");
require("dotenv").config();
var bodyParser = require("body-parser");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.json());
const fetch = require("node-fetch");
const serviceAccount = JSON.parse(process.env.GOOGLE_CREDS);
admin.initializeApp({
  // credential: admin.credential.applicationDefault(),
  credential: admin.credential.cert(serviceAccount),
});
// const adminApp = admin.initializeApp();

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
  )
    .then((response) => response.json())
    .then(async function (json) {
      res.json(json);
    });
});

app.post("/fetchLocation", cors(corsOptions), function (request, res, next) {
  var apiKey = process.env.GOOGLE_MAP_APIKEY; // this is My API keys
  
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
    .catch(function (error) {
      console.log(error);
    })
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
        })
        .catch(function (error) {
          console.log(error);
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

app.post(
  "/send-notification",
  cors(corsOptions),
  async function (req, res, next) {
    const { body } = req;
    const deviceToken =
      req.query.deviceToken ||
      body.deviceToken ||
      (body.data && body.data.deviceToken);
    console.log(`Token is ${deviceToken}`);

    const senderName = req.body["senderName"];
    const messageContent = req.body["messageContent"];
    const receiverID = req.body["receiverID"];

    await admin
      .messaging()
      .sendMulticast({
        tokens: [
          //   // "dVgKhr8QS1S3C-r-AxwPvh:APA91bGCoVHMIzP0A3A69KRbDThtS916eylvgCSffkxWrHFftKBjnGTzF6_rsDGZnbXWGldMazSGR5xkHfxh0anbA5nAGx97kcbCtGKLVJtpKRbBQEhoj-BTOLCqn6TzxGdH-zY3MOsN",
          deviceToken,
        ],
        notification: {
          title: senderName,
          body: messageContent,
        },
        data: {
          notificationType: req.body["notificationType"] || "notprovided",
          senderID: req.body["senderID"],
        },
      })
      .then(() => {
        console.log("object");
      })
      .catch((error) => {
        console.log(`Error ${error}`);
      });

    res.send({
      confirm: "new project",
      "deviceToken ": `${deviceToken}`,
      body: body,
    });
  }
);

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  console.log(`Click on link to see http://localhost:${port}`);
});
