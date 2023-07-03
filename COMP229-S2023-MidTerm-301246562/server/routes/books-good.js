// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

// console.log("Test1a");
/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  // console.log("Test22");
  book.find({}, 'Title Price Author Genre', (err, books) => {
    if (err) {
      // console.log("Retrieve error");
      return console.error(err);
    }
    else {
      // console.log(books);
      // res.render('content/index', {
      res.render('books/index', {
        title: 'Book Details',
        books: books
      });
      // console.log("Test25");
      // console.log(books);
    };
  });
});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
});


module.exports = router;
