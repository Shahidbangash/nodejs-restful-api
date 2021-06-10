var express = require("express");
bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());
var db = require("./db");

var UserController = require("./user/UserController");
app.use("/users", UserController);

module.exports = app;
