var express = require("express");
var cors = require("cors");
var app = express();
var admin = require("firebase-admin");
var fs = require("fs");
const path = require("path");
const url = require("url");
require("dotenv").config();
var bodyParser = require("body-parser");
var http = require("http");
var https = require("https");
const imageToBase64 = require("image-to-base64");
const fetch = require("node-fetch");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { pipeline } = require("stream");
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

app.post("/parse-url", cors(corsOptions), function (req, res, next) {
  const url = req.body["url"] || req.body.url;
  const file = fs.createWriteStream("./file.jpg");
  // url = new URL(url);
  var client = new URL(url).protocol == "https" ? https : http;
  client.get(url, (response) => {
    pipeline(response, file, (err) => {
      if (err) console.error("Pipeline failed.", err);
      else {
        console.log(`file $file`);
        console.log("Pipeline succeeded.");
        // res.json({ data: "response", file });
        // res.download(file.path);
        imageToBase64(file.path) // insert image url here.
          .then((response) => {
            // console.log(response); // the response will be the string base64.
            res.send(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  });
});

app.get("/parse-url", cors(corsOptions), async function (req, res, next) {
  // const url = req.params.url;
  var url = req.query.url;
  console.log(`URL is ${url}`);
  if (url === null) {
    res.status(400).json({
      error: "URL is Missing",
      message: "URL is Mising",
    });
  }

  const file = fs.createWriteStream("./file.jpg");
  // url = new URL(url);
  var client = new URL(url).protocol == "https" ? https : http;

  if (new String(url).split(":")[0].includes("s")) {
    console.log("URL is s");
    var urlList = new String(url).split(":");
    urlList[0] = new String(urlList[0]).replace("s", "");
    url = urlList[0] + ":" + urlList[1];
  }

  // console.log(`URL is ${url}`);
  console.log(`Client is ${url}`);
  console.log(`New URL Protocol is ${new URL(url).protocol}`);
  http.get(url, (response) => {
    pipeline(response, file, (err) => {
      if (err) console.error("Pipeline failed.", err);
      else {
        // console.log(`file $file`);
        // console.log("Pipeline succeeded.");
        // var data = await getBase64(file).then(
        //   data => console.log(data)
        // );
        // res.json({ data: "response", file });
        // new Buffer(file).toString('base64')
        var base64File = fs.readFileSync(file.path , {encoding:'base64'})
        // res.download(file.path);
        res.send(base64File);
      }
    });
  });
});

app.get("/proxy-link", cors(corsOptions), async function (req, res, next) {
  // cors(req, res, () => {
    console.log("Query:", req.query);
    console.log("Body:", req.body);

    let url = req.query.url;

    if (!url) {
      url = req.body.url;
    }

    if (!url) {
      res.status(403).send("URL is empty.");
    }

    console.log("Request:", url);
    fetch(url)
      .then((data) => {
        return data.blob();
      })
      .then((post) => {
        console.log(`post is ${post}`);
        res.json(post)
      });

    // fetch(url, {
    //   method: req.method,
    //   body:
    //     req.get("content-type") === "application/json"
    //       ? JSON.stringify(req.body)
    //       : req.body,
    //   headers: {
    //     "Content-Type": req.get("Content-Type"),
    //   },
    // })
    //   .then((r) =>
    //     r.headers.get("content-type") === "application/json"
    //       ? r.json()
    //       : r.text()
    //   )
    //   .then((body) => {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //     return res.status(200).send(body);
    //   });
  // });
});

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

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
        // data: {
        //   notificationType: req.body["notificationType"] || "notprovided",
        //   senderID: req.body["senderID"],
        // },
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
      // body: body,
    });
  }
);

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  console.log(`Click on link to see http://localhost:${port}`);
});
