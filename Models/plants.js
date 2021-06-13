var mongoose = require("mongoose");
var PlantSchema = new mongoose.Schema({
  name: String,
  belongsTo: { type: mongoose.Schema.Types.ObjectId, ref: "Garden" },
  date: Date,
  description: String,
});

module.exports = mongoose.model("Garden", PlantSchema);
