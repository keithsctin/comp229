const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }, // Add this line
  price: { type: Number, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true }
});

module.exports = mongoose.model('Book', bookSchema);
