var db = require("./db");
var express = require("express");
bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());

var UserController = require("./Routes/RouteHandler");
app.use("/", UserController);

module.exports = app;
