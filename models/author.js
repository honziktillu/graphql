const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
  name: { type: String, required: true },
  dateOfBirth: { type: Number },
  quote: { type: String },
  description: { type: String }
});
 
module.exports = mongoose.model("Author", authorSchema);