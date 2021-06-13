var mongoose = require("mongoose");
var GardenSchema = new mongoose.Schema({
  name: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  length: Number,
  width: Number,
});

module.exports = mongoose.model("Garden", GardenSchema);
