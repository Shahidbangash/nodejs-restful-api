var app = require("./app");
require("dotenv").config();
console.log("port address ", process.env.PORT);

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  // server.
  console.log(server.address().address);
  console.log(`Click on link to see http://localhost:${port}`);
});

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.post("/createUser", function (req, res) {
  res.setHeader("Content-Type", "application/json"); //Tell the client you are sending plain text
  // res.write("Posted data to server: "); //Send data to the
  console.log(req.body.param);
  res.end(JSON.stringify(req.body)); //Send the post data to the client and end the request
});
