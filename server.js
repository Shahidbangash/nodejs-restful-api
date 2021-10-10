var express = require("express");
var cors = require("cors");
var app = express();
var admin = require("firebase-admin");
var http = require("https");
var fs = require("fs");
const path = require("path");
const url = require("url");
require("dotenv").config();
var bodyParser = require("body-parser");
// GOOGLE_CREDS={"type": "service_account","project_id": "horselovxoxx","private_key_id": "e1c92a0abc1efda73f9a294190ab735a8698f47a","private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC4Czi0SNlfviVj\nP5OiHv9k0B9DpZt3mSwywBq8sgGnpo6npddsY3T6t2yNIzjWLRy1SJC6EHmDJz37\nuhpyqculpYWzY2/ry1VsqJYYLy5wa9dYQ3ULcyT2p4WdDYDeJPkze4hUmce00/Xt\nY0wPWzY1RvpSFHahm3B8xVFsQr4FkbvrzXJUmku2ZIrRY3sq39MmeybvRRqoBrzo\nIkN5T4tAJukb7yJjx7vGO2vQ7MC9zUc6o4ZKTdNOMeXlqqCHjnTiFCWEXTMdrN1c\nK1B/fONdLRKi1ionHjWXo8wPRNbfa62MeFiZiCgEcK0sLbdarBQa2CZbXfqgTSnD\nBeyn3EoJAgMBAAECggEAKragAGdv26Kbtr8ImnWrPFB5ERAcVtN7yIOBMQ33CFvF\ne+8nYgZrHcz4KoFkLYDmysP+otA0A1ZWMlfsz3PMybLypsGLNiRIvSEbRJ2en4TH\nw7pULcYZbA1RGzQJFoVqOKKQ72GJUdRnnSKQgnfeytqgOfB53+PdZXe9/+w1gcD9\n6SiSRwc9AmCSYYUy/zPLQ/uKjx2fJiKTdVqS2zYEJm8/9CnzDB6nSdS5AYh70ygH\nqfQf15S/l+65hIJjNaXyuDjhh7MmmYNCpxpcbq7lY1tq7btWiCyGOz0rKnv8DezM\nJgqAGWWuGsc0EoxxtF5mKQaxEBbK5xXsMaMVFTunSQKBgQDoZVMAuap9huowwods\n68l5VTC8uexCrQJjAk+VWPCprdjSotsvJDbLoqaMQzPR0eDePXkPQyMmUCFKKXjT\nQrRqdKqvvuAzGEUh2N8IW+/gn4QeGCwk9pYASUBY0GSh8vQ/E1aI7FzXiIztrfF/\nBKfJ2Aym2PutLdGqjNw7PRl2zwKBgQDKvKqFzyed0c2vsVp7TgUbpcCGpEtOnBg3\n97Jtqs7aF0fAtj5YEKVyvVmDULOgH+8OPHzfhR7F9U6wwM7Ock9HjgmG/yPTAPbT\nvlL9BW9AkuVF2ZBDrLGSc//FHhpu243IKyBLSQc8rtT9Xj9hSf9mchwEKIrZP2/U\nDCGRgAXnpwKBgCw7rPLEZBkEZurk+9XVg0Ge32nskXWXbI7fz7oDdbs2JcDh0opE\ngFF+IeksmV5kbkKevL4U70nJkqyE/ERpu+FPV3WgBRh0lCP/HWR/60Z71i/MNgrL\nDH39c0v0TlMs5SRkT+I76ufzS6+pnf+pKS6X+sB/KFgsEm495WU5GfGtAoGADXQZ\nqMmHanyqtpcBVx9lTWFhdk3exXesT8J7L7XfBi/3Tf2KA5QPNp8EGqe3U8/qsDop\nWzfdQ+u0bhxNXPvO8QOm9DNoMC9nMcP2g93hdRqKZmk6npMOMZbLCUynGmYtcXQT\nL4vIFCnR7oJbmFwtu6Gk5E3AcQw5oouvipVBTw8CgYEAlNnRwCFTdrq5U+qbstBB\nam8BZb/SFWqeu+jGRTccVYF5NQ2dzHU2hYnyVC+f+m1d9LtuhIvuH6R4GCddO11k\nnp1l6cvHphIUf0wqASr0N2pjtHAE/PPIgQdOmmh04BsxuJgqnbb3xzyEJWWtjz+l\nGOr3TB54e8VIlBUM0CTsOr0=\n-----END PRIVATE KEY-----\n","client_email": "firebase-adminsdk-38dvi@horselovxoxx.iam.gserviceaccount.com","client_id": "112076923712926456837","auth_uri": "https://accounts.google.com/o/oauth2/auth","token_uri": "https://oauth2.googleapis.com/token","auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-38dvi%40horselovxoxx.iam.gserviceaccount.com"}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.json());
// const fetch = require("node-fetch");
// const serviceAccount = JSON.parse(process.env.GOOGLE_CREDS);
// admin.initializeApp({
//   // credential: admin.credential.applicationDefault(),
//   credential: admin.credential.cert(serviceAccount),
// });
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

app.post("/parse-url", cors(corsOptions), async function (req, res, next) {
  const url = req.body["url"] || req.body.url;

  const file = fs.createWriteStream("./file.png");

  await http.get(url, (response) => {
    pipeline(response, file, (err) => {
      if (err) console.error("Pipeline failed.", err);
      else {
        console.log(`file $file`);
        console.log("Pipeline succeeded.");
        var filePath = path.join(__dirname, 'file.png');
        res.download(filePath);
      }
    });
  });
});


app.get("/parse-url", cors(corsOptions), async function (req, res, next) {
  const url = req.params.url;

  const file = fs.createWriteStream("./file.jpg");

  await http.get("http://via.placeholder.com/150/92c952", (response) => {
    pipeline(response, file, (err) => {
      if (err) console.error("Pipeline failed.", err);
      else {
        console.log(`file $file`);
        console.log("Pipeline succeeded.");
        res.json({ data: "response" });
      }
    });
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
