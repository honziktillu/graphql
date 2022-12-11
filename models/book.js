const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  name: { type: String, required: true },
  releaseDate: { type: Number, required: true },
  authorID: { type: mongoose.SchemaTypes.ObjectId },
  pages: { type: Number },
  price: { type: Number }
});
 
module.exports = mongoose.model("Book", bookSchema);