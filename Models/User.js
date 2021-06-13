var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  gender: { type: String, enum: ["Male", "Female"] },
  password: String,
});
module.exports = mongoose.model("Users", UserSchema);
