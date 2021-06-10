var app = require("./app");
require("dotenv").config();
console.log("port address ", process.env.PORT);

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  // server.
  console.log(server.address().address);
  console.log(`Click on link to see http://localhost:${port}`);
});
