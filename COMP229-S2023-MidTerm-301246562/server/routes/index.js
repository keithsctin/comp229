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

// define the game model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
   });
});



module.exports = router;
