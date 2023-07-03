// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the game model
let book = require('../models/books');

// debug
// console.log("routes_index");

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
   });
});

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  console.log("Test12");
  book.find({}, 'title price author genre', (err, books) => {
    if (err) {
      // console.log("Retrieve error");
      return console.error(err);
    }
    // else {
      console.log(books);
      res.render('books/index', {
        title: 'Home',
        books: books
      });
  });
});


module.exports = router;
