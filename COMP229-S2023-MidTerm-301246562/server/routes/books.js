//  Course name: Web Application Development
//  Course code:COMP229-008
//  Assignment: Midterm Test
//  Student ID: 301246562
//  Student Name: Sing Cheung Tin
//  Date:   Jul 03, 2023

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Book Details',
        books: books
      });
    };
  });
});

//  GET the Book Details page in order to add a new Book
// Q.2a
router.get('/add', (req, res, next) => {
  res.render('books/details', { title: 'Add Book', books: {} }); // assign title and empty array
});

// POST process the Book Details page and create a new Book - CREATE
// Q.2b
router.post('/add', (req, res, next) => {
  // get the properties and assign to newBook
  let { title, price, author, genre } = req.body;
  let newBook = new book({
    Title: title,
    Price: price,
    Author: author,
    Genre: genre
  });

  // debug
  // console.log("Add debug");
  // console.log(newBook);
  // res.redirect('/books');
  // return;

  // save to DB
  newBook.save()
    .then(() => {
      res.redirect('/books');
    })
    .catch((err) => {
      return console.error(err);
    });
});

// GET the Book Details page in order to edit an existing Book
// Q.2c
router.get('/:id', (req, res, next) => {
  let bookId = req.params.id;

  // get the book info and then redirect to details page with the data
  book.findById(bookId)
    .exec()
    .then((books) => {
      if (books) {
        res.render('books/details', { title: 'Book Update', books: books });
      } else {
        console.error('Book is not found.');
      }
    })
    .catch((err) => {
      console.error('Error retrieving book: ', err);
    });
});

// POST - process the information passed from the details form and update the document
// Q.2d
router.post('/:id', (req, res, next) => {
  let bookId = req.params.id;
  let { title, price, author, genre } = req.body;

  // get the updated book info and then update DB
  book.findByIdAndUpdate(bookId, { Title: title, Price: price, Author: author, Genre: genre })
    .exec()
    .then(() => {
      res.redirect('/books');
    })
    .catch((err) => {
      console.error('Error updating book: ', err);
    });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
// Q.2e
  let bookId = req.params.id;

  // get the ID and then delete it from the DB
  book.findByIdAndDelete(bookId)
    .exec()
    .then(() => {
      res.redirect('/books');
    })
    .catch((err) => {
      console.error('Error deleting book: ', err);
    });
});


module.exports = router;
