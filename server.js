var app = require("./app");
var express = require("express");
var User = require("./Models/User");
require("dotenv").config();
// console.log("port address ", process.env.PORT);

bodyParser = require("body-parser");
// var app = express();
// app.use(bodyParser.json());
// var db = require("./db");

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  // server.
  console.log(server.address().address);
  console.log(`Click on link to see http://localhost:${port}`);
});

// app.get("/", function (req, res) {
//   res.send("Hello World!");
// });

// app.get("/", function (req, res) {
//   User.find({}, function (err, users) {
//     if (err)
//       return res.status(500).send("There was a problem finding the users.");
//     res.status(200).send(users);
//   });
// });

// app.post("/createUser", function (req, res) {
//   res.setHeader("Content-Type", "application/json"); //Tell the client you are sending plain text
//   // res.write("Posted data to server: "); //Send data to the

//   res.end(JSON.stringify(req.body)); //Send the post data to the client and end the request
// });
